import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async findAllGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findGameById(id: number): Promise<Game> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return game;
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findGameById(id);
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  async deleteGame(id: number): Promise<void> {
    const game = await this.findGameById(id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.gameRepository.delete(game);
  }
}
