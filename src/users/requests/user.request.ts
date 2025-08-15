import { IsNotEmpty, IsEmail, Length, Matches, minLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateRequest{
    @ApiProperty({description : "Username", minLength : 2, maxLength: 20})
    @IsNotEmpty()
    @Length(2, 20)
    username: string;

    @ApiProperty({description : "Email"})
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email must be a valid email address',
    })
    email: string;

    @ApiProperty({description : "Password", minLength : 6})
    @IsNotEmpty()
    @Length(6)
    password: string;
}