
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
    @ApiProperty({ example: 'I am interested in this villa, please call me.' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ example: 'property-uuid' })
    @IsUUID()
    @IsNotEmpty()
    propertyId: string;

    @ApiProperty({ example: 'agent-uuid' })
    @IsUUID()
    @IsNotEmpty()
    agentId: string;

    @ApiProperty({ example: 'user-uuid', required: false })
    @IsUUID()
    @IsOptional()
    userId?: string;

    @ApiProperty({ example: 'Harun Shaikh', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'harun@example.com', required: false })
    @IsString()
    @IsOptional()
    email?: string;
}
