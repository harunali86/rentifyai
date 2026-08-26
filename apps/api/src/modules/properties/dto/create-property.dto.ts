import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, ListingType } from '@prisma/client';

export class CreatePropertyDto {
    @ApiProperty({ example: 'Luxury 3BHK Apartment' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Spacious apartment in heart of Mumbai' })
    @IsString()
    description: string;

    @ApiProperty({ example: 4500000 })
    @IsNumber()
    price: number;

    @ApiProperty({ enum: PropertyType, example: 'RESIDENTIAL' })
    type: PropertyType;

    @ApiProperty({ enum: ListingType, example: 'SALE' })
    listingType: ListingType;

    @ApiProperty({ example: 'MG Road' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'Pune' })
    @IsString()
    city: string;

    @ApiProperty({ example: 'Maharashtra' })
    @IsString()
    state: string;

    @ApiProperty({ example: '411001' })
    @IsString()
    zipCode: string;

    @ApiProperty({ example: 18.5204 })
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: 73.8567 })
    @IsNumber()
    longitude: number;

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsNumber()
    bedrooms?: number;

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsNumber()
    bathrooms?: number;

    @ApiProperty({ example: 1200 })
    @IsNumber()
    areaSqFt: number;

    @ApiProperty({ example: '{"gym": true, "pool": true}', required: false })
    @IsOptional()
    features?: any;

    @ApiProperty({ example: ['https://s3.aws.com/image.jpg'], required: false })
    @IsOptional()
    images?: string[];
}
