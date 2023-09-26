import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../game/entities/game.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}
  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = this.bookmarkRepository.create(createBookmarkDto);
    return this.bookmarkRepository.save(bookmark);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findAllGamesInBookmark(bookmarkId: number): Promise<Game[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(bookmarkId);
    if (!bookmark) {
      throw new NotFoundException('bookmark not found : we can find no games');
    }
    return bookmark.favorites;
  }

  async findBookmarkById(id: number): Promise<Bookmark> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(id);
    if (!bookmark) {
      throw new NotFoundException(`bookmark with id ${id} not found`);
    }
    return bookmark;
  }

  async addGameToBookmark(
    bookmarkId: number,
    gameId: number,
  ): Promise<Bookmark> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(bookmarkId, {
      relations: ['games'],
    });
    if (!bookmark) {
      throw new NotFoundException(`bookmark with ID ${bookmarkId} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOne(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    bookmark.favorites.push(game);
    return this.bookmarkRepository.save(bookmark);
  }

  async deleteGameFromBookmark(
    bookmarkId: number,
    gameId: number,
  ): Promise<Bookmark> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(bookmarkId, {
      relations: ['games'],
    });
    if (!bookmark) {
      throw new NotFoundException(`bookmark with ID ${bookmarkId} not found`);
    }

    const gameIndex = bookmark.favorites.findIndex(
      (game) => game.id === gameId,
    );
    if (gameIndex === -1) {
      throw new NotFoundException(
        `Game with ID ${gameId} not found in bookmark`,
      );
    }

    bookmark.favorites.splice(gameIndex, 1);
    return this.bookmarkRepository.save(bookmark);
  }

  async deleteBookmark(bookmarkId: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bookmark = await this.bookmarkRepository.findOne(bookmarkId);
    if (!bookmark) {
      throw new NotFoundException(`bookmark with ID ${bookmarkId} not found`);
    }
    await this.bookmarkRepository.remove(bookmark);
  }
}
