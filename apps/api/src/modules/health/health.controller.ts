import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
    constructor(private prisma: PrismaService) { }

    @Get()
    async check() {
        let dbStatus = 'UP';
        try {
            await this.prisma.$queryRaw`SELECT 1`;
        } catch (e) {
            dbStatus = 'DOWN';
        }

        return {
            status: dbStatus === 'UP' ? 'ok' : 'error',
            timestamp: new Date().toISOString(),
            services: {
                database: dbStatus,
                api: 'UP',
                uptime: process.uptime(),
                memory: process.memoryUsage(),
            },
        };
    }
}
