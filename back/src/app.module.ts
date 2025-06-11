import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategorysModule } from './categorys/categorys.module';
import { OptionsController } from './options/options.controller';
import { OptionsService } from './options/options.service';
import { OptionsModule } from './options/options.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CategorysModule, OptionsModule, ItemsModule],
  controllers: [AppController, OptionsController],
  providers: [AppService, OptionsService],
})
export class AppModule {}
