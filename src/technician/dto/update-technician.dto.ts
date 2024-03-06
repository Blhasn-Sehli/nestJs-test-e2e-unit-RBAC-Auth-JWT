import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicianDto } from './create-technician.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTechnicianDto extends PartialType(CreateTechnicianDto) {
    @ApiProperty({
        example: 'toni',
    })
    readonly name: string;
    @ApiProperty({
        example: 30,
    })
    readonly age: number;
    @ApiProperty({
        example: 'toni@gmail.com',
    })
    readonly email: string;
}
