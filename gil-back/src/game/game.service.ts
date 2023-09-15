import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from "../review/dto/create-review.dto";
import { Review } from "../review/entities/review.entity";
import { identity } from 'rxjs';

@Injectable()
export class GameService {

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
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
    const game = await this.gameRepository.findOneBy({ id: id});
    if (!game) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return game;
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ id: id });
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  async deleteGame(id: number): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id: id });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.gameRepository.delete(game);
  }

  async addReviewToGame(
    id: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({ id: id  });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const review = new Review();
    review.content = createReviewDto.content;
    review.rating = createReviewDto.rating;
    review.game = game; // Associez la review au jeu

    return this.reviewRepository.save(review);
  }


}
