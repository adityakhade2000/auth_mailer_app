import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtAuthModule } from '@app/jwt-auth';
import { MailModule } from '@app/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    DatabaseModule,
    JwtAuthModule,
    MailModule
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
