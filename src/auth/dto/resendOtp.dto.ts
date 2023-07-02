import { IsNotEmpty, IsEmail } from "class-validator";

export class ResendOtpDto{
    @IsNotEmpty({message: 'Email Is Required'})
    @IsEmail({}, {message: 'Email must be valid email address'})
    email: string;
    }