import { UserRepository } from '@app/database/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { UserType } from '@app/database/entities';
import { SignInDto } from './dto/signIn.dto';
import { MailService, generateNumericOtp } from '@app/mailer/mailer.service';
import { VerifyUserDto } from './dto/verifyUser.dto';
import { log } from 'console';
import { ResendOtpDto } from './dto/resendOtp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) { }

  // Encode User password
  public encodePassword(password: string) {
    const salt: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  // Validate User's password
  async isPassworsValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  async signUp(input: SignUpDto) {
    const { firstName, lastName, email, mobile, userType } = input;

    //CHECK USER TYPE 
    if (userType === UserType.ADMIN) {
      throw new HttpException(`User of Type: ${userType} is not allowed to sign up, please contact admin`, HttpStatus.FORBIDDEN);
    }

    // CHECK IF THE USER EXISTS IN THE DB
    const userInDb = await this.userRepository.findOne({
      where: [{ email: email }, { mobile: mobile }]
    })

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // Encode Password
    input.password = await this.encodePassword(input.password);
    
    // Generate OTP
    const otp = await generateNumericOtp();
    console.log(otp);

    const user = await this.userRepository.create({...input, otp});

    await this.mailService.sendOtp(user,otp);
    const data = await this.userRepository.save(user);

    return {
      data: { user: data },
      message: 'User registered successfully'
    };
  }

  async signIn(input: SignInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: [{ email: input.userName }, { mobile: input.userName }],
        select: ['id', 'firstName', 'lastName', 'email', 'mobile', 'password', 'userType']
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const areEqual = await this.isPassworsValid(input.password, user.password);
      if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const userResponse: any = user;

      userResponse.authToken = await this.jwtService.signAsync({
        email: user.email,
        sub: user.id
      }, { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), });

      await this.userRepository.update(user.id, { accessToken: userResponse.authToken, lastLoginAt: new Date() });

      return { data: userResponse, message: 'Logged in successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(userId: string) {
    await this.userRepository.update(userId, { accessToken: null });

    return {
      data: null,
      message: 'User logged out successfully'
    };
  }

  async findAll() {
    const user = await this.userRepository.findAndCount();
    return user;
  }

  async verifyOtp(data: VerifyUserDto){
    const user = await this.userRepository.findOneBy({email:data.email});

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if(data.otp === user.otp){
      await this.userRepository.update({email:data.email},{isveryfied:true})
      return 'User Account Verified Successfully'
    }else{
      throw new HttpException('Invalid OTP', HttpStatus.FORBIDDEN);
    }
  }

  async resendOtp(data: ResendOtpDto){
    const user = await this.userRepository.findOneBy({email:data.email});

    if(!user){
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const otp = await generateNumericOtp();
    console.log(otp);
    await this.mailService.sendOtp(user, otp);
    await this.userRepository.update({email:data.email},{otp, isveryfied:false});
    return 'OTP sent!'
  }
}
