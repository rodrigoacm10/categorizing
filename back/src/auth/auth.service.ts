import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    const passwordCrypted = await bcrypt.hash(password, 10);

    const userExist = !!(await this.usersService.findByEmail(email));
    if (userExist) return false;

    const user = await this.usersService.create({
      name,
      email,
      password: passwordCrypted,
    });

    return user;
  }

  async validate(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    // const passwordCompare = ;
  }

  async login(data: { id: string; email: string }) {
    const payload = { username: data.email, sub: data.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
