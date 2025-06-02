import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { AuthenticatedRequest } from 'src/@types/auth';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { DeleteCategoryDto } from './dto/delete-category';

@Controller('categorys')
export class CategorysController {
  constructor(private categorysService: CategorysService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createCategory(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCategoryDto,
  ) {
    const { userId } = req.user;

    return this.categorysService.create({
      userId,
      name: dto.name,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllCategory(
    @Req() req: AuthenticatedRequest,
    @Query() query: SearchCategoryDto,
  ) {
    const { userId } = req.user;

    if (query.name) {
      return this.categorysService.findAllByName({ userId, name: query.name });
    }

    return this.categorysService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async editCategory(
    @Req() req: AuthenticatedRequest,
    @Body() dto: EditCategoryDto,
  ) {
    return this.categorysService.edit({ id: dto.id, name: dto.name });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async deleteCategory(@Body() dto: DeleteCategoryDto) {
    return this.categorysService.delete(dto.id);
  }
}
