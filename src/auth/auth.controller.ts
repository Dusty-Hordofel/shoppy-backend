import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decators/auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
