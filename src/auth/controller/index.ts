import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '../service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() data: any) {
    return await this.authService.login();
  }
  @Post('register')
  async register(@Body() data: any) {
    return await this.authService.register();
  }
  @Post('refresh')
  async refresh(@Request() request: any) {
    return await this.authService.refresh();
  }
}
