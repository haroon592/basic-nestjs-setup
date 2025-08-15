import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('JwtStrategy constructor called');
    console.log('JwtStrategy secret:', secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    console.log('JwtStrategy initialized successfully');
  }

  async validate(payload: any) {
    console.log('JwtStrategy validate called with payload:', payload);
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}
