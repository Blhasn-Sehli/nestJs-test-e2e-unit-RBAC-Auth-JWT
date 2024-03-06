import { ApiProperty } from "@nestjs/swagger";

export class CreateTechnicianDto {
    @ApiProperty({
        example: 'Jack',
     })
    readonly name: string;
    @ApiProperty({
        example: 25,
     })
    readonly age: number;
    @ApiProperty({
        example: 'Jack@gmail.com',
        })
    readonly email: string;
}
