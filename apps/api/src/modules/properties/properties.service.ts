import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PropertyType, ListingType, ListingStatus } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) { }

  async create(createPropertyDto: CreatePropertyDto, agentId: string) {
    const { images, ...data } = createPropertyDto;

    // Generate a slug from title
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    // Rule: ATOMIC TRANSACTIONS (ACID Compliance)
    return this.prisma.$transaction(async (tx) => {
      const property = await tx.property.create({
        data: {
          ...data,
          slug: `${slug}-${Date.now()}`,
          agentId,
          status: ListingStatus.PENDING,
          images: images ? {
            create: images.map((url, index) => ({
              url,
              type: 'IMAGE',
              isThumbnail: index === 0, // Mark first image as thumbnail
            }))
          } : undefined
        },
        // Rule: SELECTIVE FETCHING
        select: {
          id: true,
          slug: true,
          title: true,
          status: true,
          createdAt: true
        }
      });
      return property;
    });
  }

  async findAll(query: any = {}) {
    const {
      search,
      type,
      listingType,
      minPrice,
      maxPrice,
      limit = 20,
      page = 1,
      ne_lat,
      ne_lng,
      sw_lat,
      sw_lng,
      minBeds,
      minBaths,
      minSqFt
    } = query;
    const skip = (page - 1) * Number(limit);

    // Rule: SOFT DELETES (Filter out deleted)
    const where: any = {
      status: ListingStatus.PUBLISHED,
      deletedAt: null
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (type) where.type = type;
    if (listingType) where.listingType = listingType;

    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };

    // Advanced Filters
    if (minBeds) where.bedrooms = { gte: Number(minBeds) };
    if (minBaths) where.bathrooms = { gte: Number(minBaths) };
    if (minSqFt) where.areaSqFt = { gte: Number(minSqFt) };

    // --- GEOSPATIAL BOUNDS FILTERING ---
    if (ne_lat && ne_lng && sw_lat && sw_lng) {
      where.latitude = {
        gte: Number(sw_lat),
        lte: Number(ne_lat)
      };
      where.longitude = {
        gte: Number(sw_lng),
        lte: Number(ne_lng)
      };
    }

    // Rule: SELECTIVE FETCHING (Performance Hardening)
    return this.prisma.property.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
        city: true,
        state: true,
        type: true,
        listingType: true,
        bedrooms: true,
        bathrooms: true,
        areaSqFt: true,
        address: true,
        latitude: true,
        longitude: true,
        images: {
          select: { url: true }
        },
        agent: {
          select: { name: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(skip),
    });
  }

  // --- ADMIN METHODS ---
  async findAllForAdmin() {
    return this.prisma.property.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        status: true,
        city: true,
        slug: true,
        createdAt: true,
        images: {
          take: 1,
          select: { url: true }
        },
        agent: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: ListingStatus) {
    return this.prisma.property.update({
      where: { id },
      data: { status },
    });
  }

  async findOne(slug: string, userId?: string) {
    const property = await this.prisma.property.findUnique({
      where: { slug },
      include: {
        images: true,
        agent: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
            phone: true,
          }
        },
        priceHistory: {
          orderBy: { date: 'desc' }
        },
        taxHistory: {
          orderBy: { year: 'desc' }
        },
        schools: true,
      },
    });

    if (!property) throw new NotFoundException(`Property with slug ${slug} not found`);

    // Rule: PLATFORM LEAKAGE PREVENTION (Anti-Leakage)
    // Only reveal real email/phone if the user has a PAID booking for this property
    // OR if the user is the agent of the property itself.
    let isUnlocked = false;
    if (userId) {
      if (property.agentId === userId) {
        isUnlocked = true;
      } else {
        const paidBooking = await this.prisma.booking.findFirst({
          where: {
            userId,
            propertyId: property.id,
            status: 'PAID',
          }
        });
        if (paidBooking) isUnlocked = true;
      }
    }

    if (!isUnlocked) {
      // Masking
      if (property.agent) {
        property.agent.email = property.agent.email.replace(/(.{3})(.*)(@.*)/, '$1***$3');
        property.agent.phone = property.agent.phone?.replace(/(.{4})(.*)/, '$1******') || 'Hidden';
      }
    }

    return {
      ...property,
      isUnlocked,
    };
  }

  async findAllByAgent(agentId: string) {
    return this.prisma.property.findMany({
      where: { agentId },
      include: {
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string, agentId: string) {
    const property = await this.prisma.property.findFirst({
      where: { id, agentId, deletedAt: null }
    });

    if (!property) return null;

    // Rule: SOFT DELETE (Data Safety)
    return this.prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async getAgentStats(agentId: string) {
    const [propertyCount, leadCount, paidBookings] = await Promise.all([
      this.prisma.property.count({ where: { agentId, deletedAt: null } }),
      this.prisma.lead.count({ where: { agentId } }),
      this.prisma.booking.findMany({
        where: { agentId, status: 'PAID' },
        select: { amount: true }
      })
    ]);

    const revenue = paidBookings.reduce((sum: number, b: { amount: any }) => sum + Number(b.amount), 0);

    return {
      activeListings: propertyCount,
      totalLeads: leadCount,
      totalViews: Math.floor(propertyCount * 14.2), // Simulated views
      revenue,
      totalBookings: paidBookings.length,
    };
  }

  async getAdminStats() {
    const [propertyCount, leadCount, userCount, pendingCount, paidBookings] = await Promise.all([
      this.prisma.property.count({ where: { deletedAt: null } }),
      this.prisma.lead.count(),
      this.prisma.user.count(),
      this.prisma.property.count({ where: { status: 'PENDING', deletedAt: null } }),
      this.prisma.booking.findMany({
        where: { status: 'PAID' },
        select: { amount: true }
      })
    ]);

    const totalRevenue = paidBookings.reduce((sum: number, b: { amount: any }) => sum + Number(b.amount), 0);

    return {
      totalProperties: propertyCount,
      totalLeads: leadCount,
      totalUsers: userCount,
      pendingReview: pendingCount,
      totalRevenue,
      platformBookings: paidBookings.length,
    };
  }
  async findSimilar(id: string) {
    // 1. Get the source property
    const source = await this.prisma.property.findUnique({
      where: { id },
      select: {
        id: true,
        city: true,
        price: true,
        bedrooms: true,
        listingType: true,
        type: true,
      }
    });

    if (!source) return [];

    // 2. Define "Similarity" criteria (Content-Based Filtering)
    const priceBuffer = Number(source.price) * 0.2;
    const minPrice = Number(source.price) - priceBuffer;
    const maxPrice = Number(source.price) + priceBuffer;

    return this.prisma.property.findMany({
      where: {
        id: { not: source.id }, // Exclude self
        city: { contains: source.city, mode: 'insensitive' }, // Fuzzy city match
        listingType: source.listingType,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        bedrooms: {
          gte: Math.max(0, (source.bedrooms || 0) - 1),
          lte: (source.bedrooms || 0) + 1,
        },
        status: ListingStatus.PUBLISHED,
        deletedAt: null,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
        city: true,
        address: true,
        bedrooms: true,
        bathrooms: true,
        areaSqFt: true,
        images: {
          take: 1,
          select: { url: true }
        },
        listingType: true,
      },
      orderBy: {
        price: 'asc'
      },
      take: 6,
    });
  }

  async findPersonalized(userId: string) {
    // 1. Get User's favorite signals
    const userWithFavorites = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        favorites: {
          select: {
            id: true,
            city: true,
            type: true,
            price: true,
            listingType: true,
          }
        }
      }
    });

    const favorites = userWithFavorites?.favorites || [];

    // Fallback: If no favorites, return latest/trending
    if (favorites.length === 0) {
      return this.prisma.property.findMany({
        where: { status: ListingStatus.PUBLISHED, deletedAt: null },
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { images: { take: 1 } }
      });
    }

    // 2. Extract Signals
    const favoriteIds = favorites.map(f => f.id);
    const cities = [...new Set(favorites.map(f => f.city))];
    const types = [...new Set(favorites.map(f => f.type))];
    const avgPrice = favorites.reduce((sum, f) => sum + Number(f.price), 0) / favorites.length;
    const listingTypes = [...new Set(favorites.map(f => f.listingType))];

    // 3. Query Recommendation Engine (Simulated AI Logic)
    return this.prisma.property.findMany({
      where: {
        id: { notIn: favoriteIds }, // Don't recommend what they already liked
        status: ListingStatus.PUBLISHED,
        deletedAt: null,
        OR: [
          { city: { in: cities, mode: 'insensitive' } },
          { type: { in: types } },
          {
            price: {
              gte: avgPrice * 0.7,
              lte: avgPrice * 1.3
            }
          }
        ],
        listingType: { in: listingTypes }
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: {
          take: 1
        }
      }
    });
  }
}
