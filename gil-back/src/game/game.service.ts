import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Game } from "./entities/game.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewDto } from "../review/dto/create-review.dto";
import { Review } from "../review/entities/review.entity";
import { UpdateReviewDto } from "../review/dto/update-review.dto";

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
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async findReviewByIdForGame(
    gameId: number,
    reviewId: number,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: reviewId, gameId: gameId },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found for game ${gameId}`);
    }

    return review;
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
    return this.reviewRepository.find({ gameId: gameId });
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
      throw new NotFoundException(`Review with ID ${reviewId} not found for game ${gameId}`);
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
    const game = await this.gameRepository.findOne({ id : gameId });
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
      throw new NotFoundException(`Review with ID ${reviewId} not found for game ${gameId}`);
    }

    await this.reviewRepository.remove(review);
  }



}
