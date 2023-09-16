import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let reviewRepository: Repository<Review>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService)
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );


    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });
});



