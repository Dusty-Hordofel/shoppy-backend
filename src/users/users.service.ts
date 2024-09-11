import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }

  async findOne(criteria: Partial<User>): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: criteria,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
