import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifyUserDto{
    @IsNotEmpty({message:"Email is required"})
    @IsEmail({},{message:"Email must be valid email address"})
    email: string;

    @IsNotEmpty({message:"Otp is required"})
    otp: string;
}