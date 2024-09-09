import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async test(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
    return this.authService.login(user, res);
    // if (user) {
    //   // Répondre avec succès en envoyant une réponse JSON avec statut 200
    //   return res.status(HttpStatus.OK).json(user);
    // } else {
    //   // Répondre avec une erreur en cas d'échec de validation
    //   return res
    //     .status(HttpStatus.UNAUTHORIZED)
    //     .json({ message: 'Invalid credentials' });
    // }
  }
}
