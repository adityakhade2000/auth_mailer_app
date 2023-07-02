import { IsNotEmpty } from "class-validator";

export class SignInDto{
    @IsNotEmpty({message:'Please enter email or mobile'})
    userName: string ;

    @IsNotEmpty({message: 'Password is required'})
    password: string;
}
