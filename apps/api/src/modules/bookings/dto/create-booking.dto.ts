import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    propertyId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;
}
