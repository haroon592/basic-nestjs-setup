import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
                                                                            
  async generateJwt(user: User): Promise<string> {
    const payload = { username: user.username, sub: user._id, email: user.email };
    return this.jwtService.sign(payload);
  }
}

