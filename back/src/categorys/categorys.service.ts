import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// model Category {
//   id String @id @default(uuid())
//   name String
//   userId String

//   items Item[]
//   options Option[]
//   user User @relation(fields: [userId], references: [id])
// }

@Injectable()
export class CategorysService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { name: string; userId: string }) {
    const existing = await this.findByName({
      name: data.name,
      userId: data.userId,
    });
    if (existing) {
      throw new ConflictException('Categoria já existe');
    }

    return await this.prismaService.category.create({ data });
  }

  async findOne(id: string) {
    const existing = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Categoria não econtrada');
    }

    return existing;
  }

  async findAll(userId: string) {
    return await this.prismaService.category.findMany({
      where: { userId },
    });
  }

  async findByName(data: { name: string; userId: string }) {
    return await this.prismaService.category.findUnique({
      where: { name_userId: { name: data.name, userId: data.userId } },
    });
  }

  async findAllByName(data: { userId: string; name: string }) {
    return await this.prismaService.category.findMany({
      where: { userId: data.userId, name: { contains: data.name } },
    });
  }

  async edit(data: { id: string; name: string }) {
    const existing = await this.findOne(data.id);
    if (!existing) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return await this.prismaService.category.update({
      where: { id: data.id },
      data: { name: data.name },
    });
  }

  async delete(id: string) {
    const existing = await this.findOne(id);
    if (!existing) {
      throw new NotFoundException('Categoria não econtrada');
    }

    return await this.prismaService.category.delete({ where: { id } });
  }
}
