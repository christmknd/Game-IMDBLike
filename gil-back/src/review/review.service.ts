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
}
