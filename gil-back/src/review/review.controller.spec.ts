import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UpdateReviewDto } from "./dto/update-review.dto";
import { NotFoundException } from "@nestjs/common";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Genre } from "../game/enums/genre-enum";
import { Platform } from "../game/enums/platform-enum";

const mockReviews: Review[] = [
  {
    id: 1,
    title: 'Review 1',
    content: 'This is the first review',
    rating: 5,
    pros: 'Pros of the first review',
    cons: 'Cons of the first review',
    game: []
  },
  {
    id: 2,
    title: 'Review 2',
    content: 'This is the second review',
    rating: 4,
    pros: 'Pros of the second review',
    cons: 'Cons of the second review',
    game : [
      {
        id: 1,
        name: 'Game 1',
        releaseYear: 2023,
        genres: Genre.Action,
        platform: Platform.PlayStation_4,
      }
    ]
  },
];

// @ts-ignore
const mockReviewService = {
  findAllReviews: jest.fn().mockResolvedValue(mockReviews),
  createReview: jest.fn().mockImplementation((newReview: CreateReviewDto) => {
    return { id: 3, ...newReview };
  }),
  findReviewById: jest.fn().mockImplementation((id: number) => {
    const review = mockReviews.find((r) => r.id === id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }),
  updateReview: jest
    .fn()
    .mockImplementation((id: number, updateReviewDto: UpdateReviewDto) => {
      const review = mockReviews.find((r) => r.id === id);
      if (!review) {
        throw new NotFoundException(
          `Review with ID ${id} not found: Review cannot be updated`,
        );
      }
      return { ...review, ...updateReviewDto };
    }),
  deleteReview: jest.fn().mockImplementation((id: number) => {
    const index = mockReviews.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Review with ID ${id} not found: Review cannot be deleted`,
      );
    }
    mockReviews.splice(index, 1);
    return { raw: [], affected: 1 };
  },
};

describe('ReviewController', () => {
  let reviewController: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideProvider(ReviewService)
      .useValue(mockReviewService)
      .compile();

    reviewController = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(reviewController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const result = await reviewController.findAll();
      expect(result).toEqual(mockReviews);
    });
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const newReviewDto: CreateReviewDto = {
        title: 'New Review',
        content: 'This is a new review',
        rating: 5,
        pros: 'New review pros',
        cons: 'New review cons',
      };

      const result = await reviewController.create(newReviewDto);
      expect(result).toEqual({ id: 3, ...newReviewDto });
    });
  });

  describe('findReviewById', () => {
    it('should return a review by ID', async () => {
      const reviewId = 1;
      const result = await reviewController.findReviewById(reviewId);
      expect(result).toEqual(mockReviews[0]);
    });
  });

  describe('update', () => {
    it('should update a review by ID', async () => {
      const reviewId = 1;
      const updateReviewDto: UpdateReviewDto = {
        title: 'Updated Review',
      };

      const result = await reviewController.update(reviewId, updateReviewDto);
      expect(result).toEqual({ ...mockReviews[0], ...updateReviewDto });
    });
  });

  describe('delete', () => {
    it('should delete a review by ID', async () => {
      const reviewId = 1;
      const result = await reviewController.delete(reviewId);
      expect(result).toEqual({ raw: [], affected: 1 });
    });
  });
});