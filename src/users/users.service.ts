import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// export type Usero = any;
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<Omit<User, 'password'>> {
    console.log('🚀 ~ UsersService ~ createUser ~ data:', data);
    // const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return await this.prismaService.user.create({
        data: { ...data, password: await bcrypt.hash(data.password, 10) },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ createUser ~ error:', error);
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw error;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
