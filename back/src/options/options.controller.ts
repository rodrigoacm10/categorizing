import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/@types/auth';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { SearchOptionDto } from './dto/search-option';
import { EditOptionDto } from './dto/edit-option.dto';
import { DeleteCategoryDto } from 'src/categorys/dto/delete-category';

@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createOption(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateOptionDto,
  ) {
    const { userId } = req.user;

    return await this.optionsService.create({
      userId,
      name: dto.name,
      categoryId: dto.categoryId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllOptions(
    @Req() req: AuthenticatedRequest,
    @Query() query: SearchOptionDto,
  ) {
    const { userId } = req.user;

    if (query.categoryId)
      return await this.optionsService.findAll({
        categoryId: query.categoryId,
        userId,
      });

    return await this.optionsService.findAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUnique(@Param('id') param: string) {
    return this.optionsService.findOne(param);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async editOption(@Body() dto: EditOptionDto) {
    return this.optionsService.edit({ id: dto.id, name: dto.name });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async deleteOption(@Body() dto: DeleteCategoryDto) {
    return this.optionsService.delete(dto.id);
  }
}
