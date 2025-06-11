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
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/@types/auth';
import { CreateItemDto } from './dto/create-item.dto';
import { SearchItemDto } from './dto/search-item.dto';
import { EditItemDto } from './dto/edit-item.dto';
import { EditNameItemDto } from './dto/edit-name-item.dto';
import { EditQuantityItemDto } from './dto/edit-quantity-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createItem(
    @Req() req: AuthenticatedRequest,
    @Body()
    dto: CreateItemDto,
  ) {
    const { userId } = req.user;

    return this.itemsService.create({
      userId,
      name: dto.name,
      quantity: dto.quantity,
      categoryIds: dto.categoryIds,
      optionIds: dto.optionIds,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllItems(
    @Req() req: AuthenticatedRequest,
    @Query() query: SearchItemDto,
  ) {
    const { userId } = req.user;

    return this.itemsService.findAll({
      userId,
      categoryId: query?.categoryId,
      optionId: query?.optionId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOneItem(@Param('id') param: string) {}

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async editItem(
    @Body()
    body: EditItemDto,
  ) {
    return this.itemsService.edit({
      id: body.id,
      name: body.name,
      quantity: body.quantity,
      categoryIds: body.categoryIds,
      optionIds: body.optionIds,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/name')
  async editItemName(
    @Body()
    dto: EditNameItemDto,
  ) {
    return this.itemsService.editName({ id: dto.id, name: dto.name });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/quantity')
  async editItemQuantity(
    @Body()
    body: EditQuantityItemDto,
  ) {
    return this.itemsService.editQuantity({
      id: body.id,
      quantity: body.quantity,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async deleteItem(
    @Body()
    body: DeleteItemDto,
  ) {
    return this.itemsService.delete(body.id);
  }
}
