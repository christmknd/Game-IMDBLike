import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { DeleteResult, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Game } from '../game/entities/game.entity';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let reviewRepository: Repository<Review>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let gameRepository: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));

    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      // Arrange
      const createReviewDto: CreateReviewDto = {
        title: 'Great Game',
        content: 'This game is awesome!',
        rating: 5,
        pros: 'Amazing graphics',
        cons: 'None',
      };

      const review = new Review();
      jest.spyOn(reviewRepository, 'create').mockReturnValue(review);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(review);

      // Act
      const result = await reviewService.createReview(createReviewDto);

      // Assert
      expect(result).toBe(review);
    });
  });

  describe('findAllReviews', () => {
    it('should return an array of reviews', async () => {
      // Arrange
      const reviews = [new Review(), new Review()];
      jest.spyOn(reviewRepository, 'find').mockResolvedValue(reviews);

      // Act
      const result = await reviewService.findAllReviews();

      // Assert
      expect(result).toEqual(reviews);
    });
  });

  describe('findReviewById', () => {
    it('should return a review by ID', async () => {
      const review = new Review();
      const reviewId = 1;
      jest.spyOn(reviewRepository, 'findOneBy').mockResolvedValue(review);

      const result = await reviewService.findReviewById(reviewId);

      expect(result).toBe(review);
    });

    it('should throw NotFoundException when review is not found', async () => {
      const reviewId = 1;
      jest.spyOn(reviewRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(reviewService.findReviewById(reviewId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateReview', () => {
    it('should update a review', async () => {
      const reviewId = 1;
      const updateReviewDto: UpdateReviewDto = {
        title: 'Updated Title',
        content: 'Updated content',
        rating: 4,
        pros: 'Updated pros',
        cons: 'Updated cons',
      };

      const existingReview = new Review();
      jest
        .spyOn(reviewRepository, 'findOneBy')
        .mockResolvedValue(existingReview);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(existingReview);

      // Act
      const result = await reviewService.updateReview(
        reviewId,
        updateReviewDto,
      );

      // Assert
      expect(result).toEqual(existingReview);
      expect(existingReview.title).toEqual(updateReviewDto.title);
      expect(existingReview.content).toEqual(updateReviewDto.content);
      expect(existingReview.rating).toEqual(updateReviewDto.rating);
      expect(existingReview.pros).toEqual(updateReviewDto.pros);
      expect(existingReview.cons).toEqual(updateReviewDto.cons);
    });

    it('should throw NotFoundException when review is not found', async () => {
      const reviewId = 1;
      jest.spyOn(reviewRepository, 'findOneBy').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        reviewService.updateReview(reviewId, {} as UpdateReviewDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', async () => {
      const existingReview = new Review();
      const reviewId = 1;
      jest
        .spyOn(reviewRepository, 'findOneBy')
        .mockResolvedValue(existingReview);
      jest
        .spyOn(reviewRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await reviewService.deleteReview(reviewId);

      expect(reviewRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when review is not found', async () => {
      const reviewId = 1;
      jest.spyOn(reviewRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(reviewService.deleteReview(reviewId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
