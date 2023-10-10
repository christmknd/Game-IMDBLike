import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Game } from '../game/entities/game.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userService: UsersService,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<Review> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user: user,
    });

    return this.reviewRepository.save(review);
  }

  //LISTE DE TOUTES LES REVIEWS DE LA PLATEFORME
  async findAllReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  //find toutes les reviews que l'on a fait en tant que user
  async findReviewById(id: number, gameId: number): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOneBy({ id: id }, gameId);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async updateReview(
    id: number,
    gameId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const game = await this.gameRepository.findOneBy({ id: gameId }); // Recherche du jeu par ID
    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const review = await this.reviewRepository.findOneBy({ id: gameId }); // Recherche de la critique par ID et gameId
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${id} for game ${gameId} not found`,
      );
    }

    review.title = updateReviewDto.title;
    review.content = updateReviewDto.content;
    review.rating = updateReviewDto.rating;
    review.pros = updateReviewDto.pros;
    review.cons = updateReviewDto.cons;

    // Enregistrez la critique mise à jour dans la base de données
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: number): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id: id });
    await this.reviewRepository.delete(review);
  }
}
