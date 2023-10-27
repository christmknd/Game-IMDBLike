import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../review/dto/create-review.dto';
import { Review } from '../review/entities/review.entity';
import { UpdateReviewDto } from '../review/dto/update-review.dto';
import { User } from "../users/entities/user.entity";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

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
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return game;
  }

  async updateGame(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  async deleteGame(id: number): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id: id });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    await this.gameRepository.delete(game);
  }

  //AJOUTER UNE REVIEW A UN JEU
  async addReviewToGame(
    id: number,
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      game: { id: id },
      user: { id: user.id },
    });
    return this.reviewRepository.save(review);
  }

  async findReviewByIdForGame(
    gameId: number,
    reviewId: number,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['game'],
    });

    if (!review) {
      throw new NotFoundException(
        `Review with ID ${reviewId} not found for game ${gameId}`,
      );
    }

    return review;
  }

  async findUserIdForReviewInGame(
    gameId: number,
    reviewId: number,
  ): Promise<number> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, game: { id: gameId } },
      relations: ['user'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found for game ${gameId}`);
    }

    if (!review.user) {
      throw new NotFoundException(`User not found for review with ID ${reviewId}`);
    }


    return review.user.id;
  }

  //trouver tout les reviews par rapport à un jeu spécifiquement
  async findAllReviewsForGame(gameId: number): Promise<Review[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const reviews = await this.reviewRepository.find({
      where: { game: { id: gameId } },
    });
    return reviews;
  }

  async updateReviewForGame(
    gameId: number,
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const review = await this.reviewRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: reviewId,
      gameId: gameId,
    });
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${reviewId} not found for game ${gameId}`,
      );
    }

    review.title = updateReviewDto.title;
    review.content = updateReviewDto.content;
    review.rating = updateReviewDto.rating;
    review.pros = updateReviewDto.pros;
    review.cons = updateReviewDto.cons;

    return this.reviewRepository.save(review);
  }

  async deleteReviewForGame(gameId: number, reviewId: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOne(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const review = await this.reviewRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: reviewId,
      gameId: gameId,
    });
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${reviewId} not found for game ${gameId}`,
      );
    }

    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found for game ${gameId}`);
    }

    // Supprimer la critique
    await this.reviewRepository.remove(review);
    console.log('Review removed successfully');
  }
}