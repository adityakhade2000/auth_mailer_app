
import { UserRepository } from '@app/database/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly logger: LoggerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreNotBefore: true,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: userId, username } = payload;

    const user = await this.userRepository.findByEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return payload;
  }
} 