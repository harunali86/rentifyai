import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ListingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createBookingDto: CreateBookingDto) {
        const property = await this.prisma.property.findUnique({
            where: { id: createBookingDto.propertyId, deletedAt: null },
            select: { id: true, agentId: true, status: true }
        });

        if (!property) {
            throw new NotFoundException('Property not found');
        }

        const allowedStatuses: ListingStatus[] = [ListingStatus.VERIFIED, ListingStatus.PUBLISHED];
        if (!allowedStatuses.includes(property.status)) {
            throw new BadRequestException('Property is not available for booking yet');
        }

        // Check if user already has a pending or paid booking for this property
        const existing = await this.prisma.booking.findFirst({
            where: {
                userId,
                propertyId: property.id,
                status: { in: ['PENDING', 'PAID'] }
            }
        });

        if (existing) {
            throw new BadRequestException('You already have an active booking or request for this property');
        }

        return this.prisma.booking.create({
            data: {
                userId,
                agentId: property.agentId,
                propertyId: property.id,
                amount: createBookingDto.amount,
                status: 'PENDING', // Booking status is still a string in this model as per schema
            }
        });
    }

    async confirmPayment(bookingId: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('Not authorized to confirm this payment');
        }

        if (booking.status !== 'PENDING') {
            throw new BadRequestException('Booking is not in pending state');
        }

        // Simulated payment logic: mark as PAID, generate fake paymentId
        return this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: 'PAID',
                paymentId: `txn_${Math.random().toString(36).substring(7)}`
            }
        });
    }

    async getUserBookings(userId: string) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                property: {
                    select: { title: true, slug: true, images: { where: { isThumbnail: true }, take: 1 } }
                },
                agent: {
                    select: { name: true, email: true, phone: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getAgentBookings(agentId: string) {
        return this.prisma.booking.findMany({
            where: { agentId },
            include: {
                property: {
                    select: { title: true, slug: true }
                },
                user: {
                    select: { name: true, email: true, phone: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
