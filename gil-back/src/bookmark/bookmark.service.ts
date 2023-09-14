import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../game/entities/game.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createShop(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const shop = this.bookmarkRepository.create(createBookmarkDto);
    return this.bookmarkRepository.save(shop);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findAllGamesInShop(id: number): Promise<Game[]> {
    const bookmark = await this.bookmarkRepository.findOneBy({
      id: id,
    });
    if (!bookmark) {
      throw new NotFoundException('Shop not found : we can find no games');
    }
    return bookmark.games;
  }

  async findBookmarkById(id: number): Promise<Bookmark> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOneBy({
      id: id,
    });
    if (!bookmark) {
      throw new NotFoundException(`Shop with id ${id} not found`);
    }
    return bookmark;
  }

  async addGameToBookmark( bookmarkId: number, gameId: number): Promise<Bookmark> {
    const bookmarks = await this.bookmarkRepository.find({
      where: { id: bookmarkId },
      relations: ['games'],
    });

    if (bookmarks.length === 0) {
      throw new NotFoundException(`Shop with ID ${bookmarkId} not found`);
    }

    const shop = bookmarks[0];
    const games = await this.gameRepository.find({
      where: { id: gameId },
    });

    if (games.length === 0) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const game = games[0];

    shop.games.push(game);
    return this.bookmarkRepository.save(shop);
  }

  async deleteGameFromShop( bookmarkId: number, gameId: number): Promise<Bookmark> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(shopId, {
      relations: ['games'],
    });
    if (!bookmark) {
      throw new NotFoundException(`Shop with ID ${bookmarkId} not found`);
    }

    const gameIndex = bookmark.games.findIndex((game) => game.id === gameId);
    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID ${gameId} not found in shop`);
    }

    bookmark.games.splice(gameIndex, 1);
    return this.bookmarkRepository.save(bookmark);
  }
}
