import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = this.bookRepository.create(createReviewDto);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const review = await this.reviewRepository.findOneBy({ id: id });
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: number): Promise<void> {
    const user = await this.reviewRepository.findOneBy({ id: id });
    await this.reviewRepository.remove(user);
  }
}
