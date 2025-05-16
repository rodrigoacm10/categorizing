import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validate(body);
    if (!user) return { status: false };

    return this.authService.login(user);
  }

  @Post('/register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return { data: await this.authService.register(body), status: true };
  }
}
