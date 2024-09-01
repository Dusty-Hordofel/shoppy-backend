import { Controller, Bind, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  //   @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Bind(Request())
  async login(req: any) {
    return this.authService.login(req.user);
  }
}
