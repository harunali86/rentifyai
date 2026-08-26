import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getDashboardStats() {
        const totalUsers = await this.prisma.user.count();
        const totalProperties = await this.prisma.property.count();
        const activeListings = await this.prisma.property.count({
            where: { status: 'PUBLISHED' },
        });
        const totalRevenue = await this.prisma.booking.aggregate({
            where: { status: 'COMPLETED' },
            _sum: { amount: true },
        });

        const recentUsers = await this.prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });

        return {
            totalUsers,
            totalProperties,
            activeListings,
            totalRevenue: totalRevenue._sum.amount || 0,
            recentUsers,
        };
    }

    async getAllUsers(page: number = 1, limit: number = 10, search?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isVerified: true,
                    createdAt: true,
                    _count: {
                        select: { listings: true, bookings: true },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // --- PROPERTY MANAGEMENT ---

    async getAllProperties(page: number = 1, limit: number = 10, status?: string, search?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (status && status !== 'ALL') {
            where.status = status;
        }

        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }

        const [properties, total] = await Promise.all([
            this.prisma.property.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    agent: { select: { name: true, email: true } },
                    images: { take: 1, select: { url: true } },
                }
            }),
            this.prisma.property.count({ where }),
        ]);

        return {
            data: properties,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updatePropertyStatus(id: string, status: any) {
        return this.prisma.property.update({
            where: { id },
            data: { status }
        });
    }

    async deleteProperty(id: string) {
        // Soft Delete
        return this.prisma.property.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'DRAFT' } // Archive it
        });
    }

    // --- USER MANAGEMENT ---

    async updateUserRole(id: string, role: any) {
        return this.prisma.user.update({
            where: { id },
            data: { role }
        });
    }

    async toggleUserVerification(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error("User not found");

        return this.prisma.user.update({
            where: { id },
            data: { isVerified: !user.isVerified }
        });
    }
    // --- LEADS MANAGEMENT ---

    async getAllLeads(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [leads, total] = await Promise.all([
            this.prisma.lead.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true } },
                    property: { select: { title: true, price: true, city: true } },
                    agent: { select: { name: true } }
                }
            }),
            this.prisma.lead.count()
        ]);

        return {
            data: leads,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    // --- SAVED SEARCHES ---

    async getAllSavedSearches(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [searches, total] = await Promise.all([
            this.prisma.savedSearch.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true } }
                }
            }),
            this.prisma.savedSearch.count()
        ]);

        return {
            data: searches,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
    }

    // --- PROPERTY EDITING ---

    async getPropertyDetails(id: string) {
        return this.prisma.property.findUnique({
            where: { id },
            include: {
                images: { orderBy: { createdAt: 'desc' } },
                agent: { select: { name: true, email: true } },
                priceHistory: true
            }
        });
    }

    async addPropertyImage(id: string, url: string) {
        return this.prisma.media.create({
            data: {
                url,
                propertyId: id,
                type: 'IMAGE'
            }
        });
    }

    async removePropertyImage(mediaId: string) {
        return this.prisma.media.delete({
            where: { id: mediaId }
        });
    }

    async updatePropertyDetails(id: string, data: any) {
        return this.prisma.property.update({
            where: { id },
            data: {
                title: data.title,
                price: Number(data.price),
                status: data.status,
                type: data.type,
                listingType: data.listingType,
                bedrooms: Number(data.bedrooms),
                bathrooms: Number(data.bathrooms),
                areaSqFt: Number(data.areaSqFt),
                description: data.description,
                address: data.address,
                city: data.city,
                zipCode: data.zipCode,
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                features: data.features // JSON object
            }
        });
    }
}
