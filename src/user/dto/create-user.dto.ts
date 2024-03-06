import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty(
        {
            example: "Jack@gamail.com",
            description: 'The email of the User',
            type: String
        }
    )


    readonly email: string;
    @ApiProperty(
        {
            example: "123456",
            description: 'The password of the User',
            type: String
        }
    )
    readonly password: string;
    @ApiProperty(
        {
            example: "Jack",
            description: 'The name of the User',
            type: String
        }
    )
    readonly name: string;
    @ApiProperty(
        {
            example: "admin | manager",
            description: 'The role of the User',
            type: String
        }
    )
    readonly role: string;
}
