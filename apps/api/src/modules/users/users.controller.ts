import { Controller, Get, Param, Post, UseGuards, Request, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('agents')
  findAgents() {
    return this.usersService.findAgents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites/my')
  async getMyFavorites(@User() user: any) {
    return this.usersService.getFavorites(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/:propertyId')
  async toggleFavorite(@User() user: any, @Param('propertyId') propertyId: string) {
    return this.usersService.toggleFavorite(user.userId, propertyId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('saved-searches')
  async saveSearch(@User() user: any, @Body() body: { name: string; filters: any }) {
    return this.usersService.saveSearch(user.userId, body.name, body.filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved-searches/my')
  async getMySavedSearches(@User() user: any) {
    return this.usersService.getSavedSearches(user.userId);
  }
}
