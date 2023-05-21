import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    const passwordIsMatch = await argon2.verify(user.password, password);

    if (user && passwordIsMatch) return user;
    else throw new UnauthorizedException('Неправильный лоигн или пароль, попробуйте еще раз');
  }

  async login(user: IUser) {
    const { id, username, email } = user;
    return {
      id, 
      username,
      email, 
      token: this.jwtService.sign({id: user.id, email: user.email, username: user.username})
    }
  }
}
