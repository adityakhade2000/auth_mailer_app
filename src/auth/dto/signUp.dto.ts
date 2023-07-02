import { UserType } from "@app/database/entities";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class SignUpDto {
    @IsNotEmpty({message:'First Name is required'})
    firstName: string;

    @IsNotEmpty({message:'Last Name is required'})
    lastName: string; 

    @IsNotEmpty({message:'Email is required'})
    @IsEmail({},{message:'Must be valid email address'})
    email: string;

    @IsNotEmpty({message: 'Mobile number is required'})
    @IsPhoneNumber("IN", {message:"Invalid Mobile Number"})
    mobile: string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;

    @IsOptional()
    userType: UserType;



}
