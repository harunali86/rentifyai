import { Controller, Get, Post, Query, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    async getDashboardStats() {
        return this.adminService.getDashboardStats();
    }

    @Get('users')
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string,
    ) {
        return this.adminService.getAllUsers(Number(page), Number(limit), search);
    }

    @Post('users/:id/role')
    async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
        return this.adminService.updateUserRole(id, role as any);
    }

    @Post('users/:id/verify')
    async toggleUserVerification(@Param('id') id: string) {
        return this.adminService.toggleUserVerification(id);
    }

    // --- PROPERTIES ---

    @Get('properties')
    async getAllProperties(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('status') status?: string,
        @Query('search') search?: string,
    ) {
        return this.adminService.getAllProperties(Number(page), Number(limit), status, search);
    }

    @Post('properties/:id/status')
    async updatePropertyStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.adminService.updatePropertyStatus(id, status);
    }

    @Post('properties/:id/delete')
    async deleteProperty(@Param('id') id: string) {
        return this.adminService.deleteProperty(id);
    }

    @Post('properties/:id/update')
    async updatePropertyDetails(@Param('id') id: string, @Body() body: any) {
        return this.adminService.updatePropertyDetails(id, body);
    }

    @Get('properties/:id')
    async getPropertyDetails(@Param('id') id: string) {
        return this.adminService.getPropertyDetails(id);
    }

    @Post('properties/:id/images')
    async addPropertyImage(@Param('id') id: string, @Body('url') url: string) {
        return this.adminService.addPropertyImage(id, url);
    }

    @Post('media/:id/delete')
    async removePropertyImage(@Param('id') id: string) {
        return this.adminService.removePropertyImage(id);
    }



    // --- LEADS & OTHERS ---

    @Get('leads')
    async getAllLeads(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.adminService.getAllLeads(Number(page), Number(limit));
    }

    @Get('saved-searches')
    async getAllSavedSearches(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.adminService.getAllSavedSearches(Number(page), Number(limit));
    }
}
