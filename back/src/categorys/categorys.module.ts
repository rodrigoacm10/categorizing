import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}
