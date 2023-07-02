import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@app/database';
import { AccessTokenStrategy } from './strategies';
import { AccessTokenGuard } from './guards/access-token.guards';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [JwtService, AccessTokenStrategy, AccessTokenGuard],
  exports: [JwtService, AccessTokenStrategy],
})
export class JwtAuthModule { }
