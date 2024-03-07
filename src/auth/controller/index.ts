import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login() {
    return await this.authService.login();
  }
  @Post()
  async register() {
    return await this.authService.register();
  }
  @Post()
  async refresh() {
    return await this.authService.refresh();
  }
  @Post()
  async logout() {
    return await this.authService.logout();
  }
}
