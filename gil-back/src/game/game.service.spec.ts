import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Review } from '../review/entities/review.entity';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

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

  describe('createGame', () =>{
    it('should create a game', async () => {

    })
  })

  describe('findAllGames', () =>{
    it('should return an array of books', async () => {

    })
  })

  describe('findBookById', () =>{
    it('should return a game by ID', async () => {

    })

    it('should throw NotFoundException :  book is not found', async () => {
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(gameService.findGameById(gameId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  })

  describe('updateGame', () =>{
    it('should update a game', async () => {

    })
  })

});
