import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Review } from '../review/entities/review.entity';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GameService', () => {
  let gameService: GameService;
  let gameRepository: Repository<Game>;
  let reviewRepository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
  });

  it('should be defined', () => {
    expect(gameService).toBeDefined();
  });
});
