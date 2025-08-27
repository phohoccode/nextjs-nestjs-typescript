import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    console.log('>>> check user login: ', user);

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException();
    }

    const isValidPassword = await comparePasswordHelper(pass, user?.password);

    if (!isValidPassword) {
      console.log('Invalid password');
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
