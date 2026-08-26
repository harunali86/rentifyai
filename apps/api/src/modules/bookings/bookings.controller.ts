import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    create(@Request() req: any, @Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(req.user.id, createBookingDto);
    }

    @Post(':id/confirm')
    confirmPayment(@Param('id') id: string, @Request() req: any) {
        return this.bookingsService.confirmPayment(id, req.user.id);
    }

    @Get('my')
    getUserBookings(@Request() req: any) {
        return this.bookingsService.getUserBookings(req.user.id);
    }

    @Get('agent')
    @UseGuards(RolesGuard)
    @Roles('AGENT')
    getAgentBookings(@Request() req: any) {
        return this.bookingsService.getAgentBookings(req.user.id);
    }
}
