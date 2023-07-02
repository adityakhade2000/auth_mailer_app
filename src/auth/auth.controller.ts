import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { AccessTokenGuard } from '@app/jwt-auth/guards/access-token.guards';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { VerifyUserDto } from './dto/verifyUser.dto';
import { ResendOtpDto } from './dto/resendOtp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUP(@Body() input:SignUpDto ) {
    return this.authService.signUp(input);
  }

  @Post('/signin')
  signIn(@Body() input: SignInDto){
    return this.authService.signIn(input);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() user: VerifyUserDto){
    return this.authService.verifyOtp(user);
  }

  @Post('resendOtp')
  resendOtp(@Body() user:ResendOtpDto){
    return this.authService.resendOtp(user);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logOut(@GetCurrentUserId() userId) {
    return this.authService.logout(userId);
  }
  
}


