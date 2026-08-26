import { Controller, Get, Post, Body, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeadStatus } from '@prisma/client';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new property lead/inquiry' })
    @ApiResponse({ status: 201, description: 'Lead successfully created' })
    create(@Body() createLeadDto: CreateLeadDto) {
        return this.leadsService.create(createLeadDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my')
    @ApiOperation({ summary: 'Get approved leads for the logged-in agent' })
    findAllMy(@Request() req: any) {
        return this.leadsService.findAllByAgent(req.user.id);
    }

    // --- ADMIN ROUTES (Commission Shield) ---

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('admin/all')
    @ApiOperation({ summary: 'Global Lead Monitoring for Admin' })
    findAllAdmin() {
        return this.leadsService.findAllForAdmin();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Patch('admin/:id/status')
    @ApiOperation({ summary: 'Moderation: Approve/Reject/Track Leads' })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: LeadStatus,
        @Body('notes') notes?: string
    ) {
        return this.leadsService.updateStatus(id, status, notes);
    }
}
