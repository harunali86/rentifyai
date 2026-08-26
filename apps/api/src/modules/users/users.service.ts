import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAgents() {
    return this.prisma.user.findMany({
      where: {
        role: 'AGENT',
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        _count: {
          select: {
            listings: {
              where: { deletedAt: null }
            }
          }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      }
    });
  }

  async getFavorites(userId: string) {
    return this.prisma.property.findMany({
      where: {
        favoritedBy: {
          some: { id: userId }
        }
      },
      include: {
        images: { take: 1, select: { url: true } },
        agent: { select: { name: true, email: true } }
      }
    });
  }

  async toggleFavorite(userId: string, propertyId: string) {
    const user: any = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: { where: { id: propertyId } } }
    });

    if (user && user.favorites && user.favorites.length > 0) {
      // Disconnect (Unfavorite)
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          favorites: { disconnect: { id: propertyId } }
        }
      });
      return { favorited: false };
    } else {
      // Connect (Favorite)
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          favorites: { connect: { id: propertyId } }
        }
      });
      return { favorited: true };
    }
  }
  async saveSearch(userId: string, name: string, filters: any) {
    return this.prisma.savedSearch.create({
      data: {
        userId,
        name,
        filters
      }
    });
  }

  async getSavedSearches(userId: string) {
    return this.prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
