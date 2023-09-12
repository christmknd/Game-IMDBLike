import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from "../game/entities/game.entity";

@Injectable()
export class ShopService {

  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Game)
    private bookRepository: Repository<Game>,
  ) {}
  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.create(createShopDto);
    return this.shopRepository.save(shop);
  }

  async findAllShops(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findAllGamesInShop(shopId: number): Promise<Game[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await this.shopRepository.findOne(shopId);
    if (!shop) {
      throw new NotFoundException('Shop not found : we can find no games');
    }
    return shop.games;
  }

  async findShopById(id: number): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await this.shopRepository.findOne(id);
    if (!shop) {
      throw new NotFoundException(`Shop with id ${id} not found`);
    }
    return shop;
  }

  async addGameToShop(shopId: number, gameId: number): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await this.shopRepository.findOne(shopId, {
      relations: ['games'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.bookRepository.findOne(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    shop.games.push(game);
    return this.shopRepository.save(shop);
  }


  async deleteGameFromShop(shopId: number, gameId: number): Promise<Shop> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await this.shopRepository.findOne(shopId, {
      relations: ['games'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }

    const gameIndex = shop.games.findIndex((game) => game.id === gameId);
    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID ${gameId} not found in shop`);
    }

    shop.games.splice(gameIndex, 1);
    return this.shopRepository.save(shop);
  }

  async deleteShop(shopId: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await this.shopRepository.findOne(shopId);
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }
    await this.shopRepository.remove(shop);
  }
}
