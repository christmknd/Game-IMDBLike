import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Game } from '../game/entities/game.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review>{
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  //Ajouter une review à un jeu 
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



  //LISTE DE TOUTES LES REVIEWS DE LA PLATEFORME
  async findAllReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }


  async findReviewById(id: number, gameId: number): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOneBy({ id: id }, gameId);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async findReviewsByGameId(gameId: number): Promise<Review[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOne(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    } 
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.reviewRepository.find({ where: { gameId } });
  }

  async findReviewByGameIdAndReviewId(gameId: number, reviewId: number): Promise<Review> {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({gameId : gameId});
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOne({ where: { id: reviewId, gameId } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found in Game with ID ${gameId}`);
    } 
    return review;
  }

  async updateReviewByGameIdAndReviewId(
    gameId: number,
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({gameId : gameId});
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOne({ where: { id: reviewId, gameId } });
    if(!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found in Game with ID ${gameId}`);    

    }
    return this.reviewRepository.save({ ...review, ...updateReviewDto });
  }

  async deleteReviewByGameIdAndReviewId(gameId: number, reviewId: number): Promise<void> {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const game = await this.gameRepository.findOneBy({gameId : gameId});
    if (!game) throw new NotFoundException(`Game with ID ${gameId} not found`);
    
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOne({ where: { id: reviewId, gameId } });
    if (!review) {
      throw new  NotFoundException(`Review with ID ${reviewId} not found in Game with ID ${gameId}`);
    } 
    
    await this.reviewRepository.delete(reviewId);
  }
}
