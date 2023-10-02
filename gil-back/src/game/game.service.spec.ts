import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Review } from '../review/entities/review.entity';
import { DeleteResult, Repository } from "typeorm";
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Genre } from './enums/genre-enum';
import { Platform } from './enums/platform-enum';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateReviewDto } from '../review/dto/create-review.dto';

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

  describe('createGame', () => {
    it('should create a game', async () => {
      const createGameDto: CreateGameDto = {
        name: 'EAFC24',
        releaseYear: 2023,
        genres: Genre.Sport,
        platform: Platform.PlayStation_5,
      };

      const game = new Game();
      jest.spyOn(gameRepository, 'create').mockReturnValue(game);
      jest.spyOn(gameRepository, 'save').mockResolvedValue(game);

      const result = await gameService.createGame(createGameDto);
      expect(result).toBe(game);
    });
  });

  describe('findAllGames', () => {
    it('should return an array of books', async () => {
      const games = [new Game(), new Game()];
      jest.spyOn(gameRepository, 'find').mockResolvedValue(games);

      const result = await gameService.findAllGames();

      expect(result).toEqual(games);
    });
  });

  describe('findBookById', () => {
    it('should return a game by ID', async () => {
      const game = new Game();
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(game);

      const result = await gameService.findGameById(gameId);

      expect(result).toBe(game);
    });

    it('should throw NotFoundException :  book is not found', async () => {
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(gameService.findGameById(gameId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateGame', () => {
    it('should update a game', async () => {
      const gameId = 1;
      const updateGameDto: UpdateGameDto = {
        name: 'Updated Name',
        releaseYear: 2024,
        genres: Genre.Course,
        platform: Platform.PlayStation_4,
      };

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);
      jest.spyOn(gameRepository, 'save').mockResolvedValue(existingGame);

      const result = await gameService.updateGame(gameId, updateGameDto);

      expect(result).toEqual(existingGame);
      expect(existingGame.name).toEqual(updateGameDto.name);
      expect(existingGame.releaseYear).toEqual(updateGameDto.releaseYear);
      expect(existingGame.genres).toEqual(updateGameDto.genres);
      expect(existingGame.platform).toEqual(updateGameDto.platform);
    });

    it('should throw NotFoundException when game is not found', async () => {
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(
        gameService.updateGame(gameId, {} as UpdateGameDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteGame', () => {
    it('should delete a game', async () => {
      const existingGame = new Game();
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);
      jest.spyOn(gameRepository, 'delete').mockResolvedValue({affected: 1} as DeleteResult);

      await gameService.deleteGame(gameId);
      expect(gameRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when book is not found', async () => {
      const gameId = 1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(gameService.deleteGame(gameId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('addReviewToGame', () => {
    it('should add a review to a game', async () => {
      // Arrange
      const gameId = 1;
      const createReviewDto: CreateReviewDto = {
        title: 'Great Game',
        content: 'This game is awesome!',
        rating: 5,
        pros: 'Amazing graphics',
        cons: 'None',
      };
      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);
      const createdReview = new Review();
      jest.spyOn(reviewRepository, 'create').mockReturnValue(createdReview);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(createdReview);

      // Act
      const result = await gameService.addReviewToGame(gameId, createReviewDto);

      // Assert
      expect(result).toEqual(createdReview);
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id: gameId });
      expect(reviewRepository.create).toHaveBeenCalledWith(createReviewDto);
      expect(reviewRepository.save).toHaveBeenCalledWith(createdReview);
    });

    it('should throw NotFoundException when game is not found', async () => {
      // Arrange
      const gameId = 1;
      const createReviewDto: CreateReviewDto = {
        title: 'Great Game',
        content: 'This game is awesome!',
        rating: 5,
        pros: 'Amazing graphics',
        cons: 'None',
      };
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(gameService.addReviewToGame(gameId, createReviewDto),).rejects.toThrowError(
        NotFoundException);
    });
  });
});
