import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
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
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {

    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async findAllReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findReviewById(id: number): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOneBy({ id: id });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id: id }); // Recherche de la critique par ID et gameId
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${id}  not found`,
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOneBy({ id: id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    await this.reviewRepository.delete(review);
  }
}
