import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  // model Item {
  //   id String @id @default(uuid())
  //   name String
  //   quantity Int
  //   userId String

  //   options Option[]
  //   categorys Category[]
  //   user User @relation(fields: [userId], references: [id])
  // }

  async create(data: {
    name: string;
    quantity: number;
    userId: string;
    categoryIds: string[];
    optionIds: string[];
  }) {
    const exist = await this.findByName({
      userId: data.userId,
      name: data.name,
    });
    if (exist) throw new ConflictException('Item já existente');

    return this.prismaService.item.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        userId: data.userId,
        itemCategorys: {
          create: data.categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        itemOptions: {
          create: data.optionIds.map((optionId) => ({
            option: { connect: { id: optionId } },
          })),
        },
      },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.item.findUnique({
      where: { id },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async findAll(data: {
    userId: string;
    categoryId?: string;
    optionId?: string;
  }) {
    return await this.prismaService.item.findMany({
      where: {
        userId: data.userId,
        ...(data.categoryId && {
          itemCategorys: { some: { categoryId: data.categoryId } },
        }),
        ...(data.optionId && {
          itemOptions: { some: { optionId: data.optionId } },
        }),
      },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async findByName(data: { userId: string; name: string }) {
    return await this.prismaService.item.findUnique({
      where: { name_userId: { userId: data.userId, name: data.name } },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async edit(data: {
    id: string;
    name: string;
    quantity: number;
    categoryIds: string[];
    optionIds: string[];
  }) {
    const exist = await this.findOne(data.id);
    if (!exist) throw new NotFoundException('Item não encontrado');

    return this.prismaService.item.update({
      where: { id: data.id },
      data: {
        name: data.name,
        quantity: data.quantity,
        itemCategorys: {
          deleteMany: {},
          create: data.categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        itemOptions: {
          deleteMany: {},
          create: data.optionIds.map((optionId) => ({
            option: { connect: { id: optionId } },
          })),
        },
      },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async editName(data: { id: string; name: string }) {
    return this.prismaService.item.update({
      where: { id: data.id },
      data: { name: data.name },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async editQuantity(data: { id: string; quantity: number }) {
    return this.prismaService.item.update({
      where: { id: data.id },
      data: { quantity: data.quantity },
      include: {
        itemCategorys: { include: { category: true } },
        itemOptions: { include: { option: true } },
      },
    });
  }

  async delete(id: string) {
    return this.prismaService.item.delete({ where: { id } });
  }
}
