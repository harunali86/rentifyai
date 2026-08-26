import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { EmailService } from '../email/email.service';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService
    ) { }

    /**
     * Rule: LEAKAGE DETECTION
     * Scans message for phone numbers or emails to prevent off-platform deals.
     */
    private detectLeakage(message: string): boolean {
        const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        return phoneRegex.test(message) || emailRegex.test(message);
    }

    async create(createLeadDto: CreateLeadDto) {
        const { propertyId, agentId, userId, message, name, email } = createLeadDto;

        const property = await this.prisma.property.findUnique({
            where: { id: propertyId },
        });

        if (!property) throw new NotFoundException('Property not found');

        const isFlagged = this.detectLeakage(message);

        // Rule: INITIAL STATE IS PENDING (Admin must approve)
        const lead = await this.prisma.lead.create({
            data: {
                message,
                propertyId,
                agentId,
                userId: userId || null,
                guestName: name || null,
                guestEmail: email || null,
                status: LeadStatus.PENDING,
                isFlagged,
            }
        });

        return {
            id: lead.id,
            status: lead.status,
            message: 'Inquiry received and sent for verification.'
        };
    }

    /**
     * Agent only sees leads that are APPROVED by Admin.
     * Protects commission by preventing direct contact before deal tracking.
     */
    async findAllByAgent(agentId: string) {
        return this.prisma.lead.findMany({
            where: {
                agentId,
                status: LeadStatus.APPROVED
            },
            include: {
                property: { select: { title: true, slug: true, city: true } },
                user: { select: { name: true, email: true, phone: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    // --- ADMIN MODULE METHODS ---

    async findAllForAdmin() {
        return this.prisma.lead.findMany({
            include: {
                property: { select: { title: true, city: true } },
                agent: { select: { name: true, email: true } },
                user: { select: { name: true, email: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async updateStatus(id: string, status: LeadStatus, adminNotes?: string) {
        const lead = await this.prisma.lead.update({
            where: { id },
            data: { status, adminNotes },
            include: {
                agent: { select: { email: true } },
                property: { select: { title: true } },
                user: { select: { name: true } }
            }
        });

        // Trigger notification to agent only if approved
        if (status === LeadStatus.APPROVED && lead.agent?.email) {
            this.emailService.sendLeadNotification(lead.agent.email, {
                name: lead.guestName || lead.user?.name || 'Potential Buyer',
                email: 'Contact Unlocked in Dashboard',
                message: lead.message,
                propertyTitle: lead.property.title,
                propertyLink: '#' // Agent sees it in dashboard
            });
        }

        return lead;
    }
}
