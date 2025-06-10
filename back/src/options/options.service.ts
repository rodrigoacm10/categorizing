import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { name: string; userId: string; categoryId: string }) {
    const existing = await this.findByName({
      name: data.name,
      userId: data.userId,
    });
    if (existing) throw new ConflictException('Option já existe');

    return await this.prismaService.option.create({ data });
  }

  async findOne(id: string) {
    const exist = await this.prismaService.option.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Option não econtrada');

    return exist;
  }

  async findAll(data: { userId: string; categoryId?: string }) {
    return await this.prismaService.option.findMany({
      where: data.categoryId
        ? { userId: data.userId, categoryId: data.categoryId }
        : { userId: data.userId },
    });
  }

  async findByName(data: { name: string; userId: string }) {
    return await this.prismaService.option.findUnique({
      where: { name_userId: { name: data.name, userId: data.userId } },
    });
  }

  async findAllbyName(data: { name: string; userId: string }) {
    return await this.prismaService.option.findMany({
      where: { userId: data.userId, name: { contains: data.name } },
    });
  }

  async edit(data: { id: string; name: string }) {
    const existing = await this.findOne(data.id);
    if (!existing) throw new NotFoundException('Option não econtrada');

    return this.prismaService.option.update({
      where: { id: data.id },
      data: { name: data.name },
    });
  }

  async delete(id: string) {
    const exist = await this.findOne(id);
    if (!exist) throw new NotFoundException('Option não econtrada');

    return await this.prismaService.option.delete({ where: { id } });
  }
}
