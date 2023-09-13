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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation, ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Shop } from "./entities/shop.entity";

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: 'Create a new shop' })
  @ApiBody({ type: CreateShopDto })
  @ApiResponse({
    status: 201,
    description: 'Shop created successfully',
    type: Shop,
  })
  @ApiBadRequestResponse({ description: 'Shop cannot be registrated' })
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    try {
      return this.shopService.createShop(createShopDto);
    } catch {
      throw new BadRequestException('Shop cannot be registrated')
    }
  }

  @ApiOperation({ summary: 'Get all shops' })
  @ApiNotFoundResponse({ description: 'No shops found' })
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

  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return shop by ID',
    type: Shop,
  })
  @ApiNotFoundResponse({ description: 'Shop not found' })
  @Get(':id')
  findShopById(@Param('id') id: number) {
    try {
      return this.shopService.findShopById(+id);
    } catch {
      throw new NotFoundException(`Shop not found `);
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

  @ApiOperation({ summary: 'Delete shop by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Shop deleted successfully' })
  @ApiNotFoundResponse({ description: 'Shop not found : cannot be deleted' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.shopService.deleteShop(+id);
    } catch {
      throw new NotFoundException(`Shop cannot be deleted`);
    }
  }
}
