import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ProductsGateway } from './products.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}
  async createProduct(data: CreateProductDto, userId: string) {
    const product = await this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });

    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProducts(status?: string) {
    const args: Prisma.ProductFindFirstArgs = {};
    // if (status === 'availible') {
    //   args.where = { sold: false };
    // }

    // return this.prismaService.product.findMany(args);
    return this.prismaService.product.findMany({
      where: {
        sold: false,
      },
    });
  }

  async getProduct(productId: string) {
    return this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async update(productId: string, data: Prisma.ProductUpdateInput) {
    await this.prismaService.product.update({
      where: { id: productId },
      data,
    });

    this.productsGateway.handleProductUpdated();
  }
}
