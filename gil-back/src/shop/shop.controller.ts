import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    try {
      return this.shopService.createShop(createShopDto);
    } catch {
      throw new BadRequestException('Shop cannot be registrated')
    }
  }

  @Get()
  findAllShops() {
    try {
      return this.shopService.findAllShops();
    } catch {
      throw new NotFoundException('No games found : the Shop is maybe empty');
    }
  }

  @Get(':shopId/games')
  findAllGamesInShop(@Param('shopId') shopId: number) {
    try {
      return this.shopService.findAllGamesInShop(shopId);
    } catch {
      throw new NotFoundException('No games found : the Shop is maybe empty');
    }
  }

  @Get(':id')
  findShopById(@Param('id') id: string) {
    try {
      return this.shopService.findShopById(+id);
    } catch {
      throw new NotFoundException(`Games with id ${id} not found `);
    }
  }

  @Post(':shopId/add-game/:gameId')
  addGameToShop(
    @Param('shopId') shopId: number,
    @Param('gameId') gameId: number,
  ) {
    try {
      return this.shopService.addGameToShop(shopId, gameId);
    } catch {
      throw new NotFoundException(
        'Cannot add the game from the shop : the game may not exist',
      );
    }
  }


  @Delete(':shopId/delete-game/:gameId')
  deleteGameFromShop(
    @Param('shopId') shopId: number,
    @Param('gameId') gameId: number,
  ) {
    try {
      return this.shopService.deleteGameFromShop(shopId, gameId);
    } catch {
      throw new NotFoundException(
        'Cannot delete the game from the shop : the game may not exist',
      );
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.shopService.deleteShop(+id);
    } catch {
      throw new NotFoundException(`Shop cannot be deleted`);
    }
  }
}
