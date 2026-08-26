import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { ListingStatus } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req: any) {
    // User ID comes from the JWT via JwtStrategy
    return this.propertiesService.create(createPropertyDto, req.user.id);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.propertiesService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyProperties(@Request() req: any) {
    return this.propertiesService.findAllByAgent(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/delete') // Or @Delete(':id'), using Post for easier form actions if needed, but let's go standard
  remove(@Param('id') id: string, @Request() req: any) {
    return this.propertiesService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('personalized')
  findPersonalized(@Request() req: any) {
    return this.propertiesService.findPersonalized(req.user.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':slug')
  findOne(@Param('slug') slug: string, @Request() req: any) {
    return this.propertiesService.findOne(slug, req.user?.id);
  }

  @Get(':id/similar')
  findSimilar(@Param('id') id: string) {
    return this.propertiesService.findSimilar(id);
  }

  // --- ADMIN ENDPOINTS ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/all')
  findAllAdmin() {
    return this.propertiesService.findAllForAdmin();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatus(@Param('id') id: string, @Body('status') status: ListingStatus) {
    return this.propertiesService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('agent/stats')
  getAgentStats(@Request() req: any) {
    return this.propertiesService.getAgentStats(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/stats')
  getAdminStats() {
    return this.propertiesService.getAdminStats();
  }
}
