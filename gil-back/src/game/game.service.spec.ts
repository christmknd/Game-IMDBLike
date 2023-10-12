import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Review } from '../review/entities/review.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Genre } from './enums/genre-enum';
import { Platform } from './enums/platform-enum';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateReviewDto } from '../review/dto/create-review.dto';
import { UpdateReviewDto } from '../review/dto/update-review.dto';
import { User } from '../users/entities/user.entity';

describe('GameService', () => {
  let gameService: GameService;
  let gameRepository: Repository<Game>;
  let reviewRepository: Repository<Review>;
  let userRepository: Repository<User>;

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
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
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
      jest
        .spyOn(gameRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

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
    it('should throw NotFoundException when game is not found', async () => {
      // Arrange
      const gameId = 1;
      const userId = 1;
      const createReviewDto: CreateReviewDto = {
        title: 'Great Game',
        content: 'This game is awesome!',
        rating: 5,
        pros: 'Amazing graphics',
        cons: 'None',
      };

      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.addReviewToGame(gameId, userId, createReviewDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException when user is not found', async () => {
      // Arrange
      const gameId = 1;
      const userId = 1;
      const createReviewDto: CreateReviewDto = {
        title: 'Great Game',
        content: 'This game is awesome!',
        rating: 5,
        pros: 'Amazing graphics',
        cons: 'None',
      };

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.addReviewToGame(gameId, userId, createReviewDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateReviewForGame', () => {
    it('should update a review for a game', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;
      const updateReviewDto: UpdateReviewDto = {
        title: 'Updated Game',
        content: 'This game is still awesome!',
        rating: 4,
        pros: 'Graphics are still amazing',
        cons: 'None',
      };

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);

      const existingReview = new Review();
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(existingReview);

      jest.spyOn(reviewRepository, 'save').mockResolvedValue(existingReview);

      // Act
      const result = await gameService.updateReviewForGame(
        gameId,
        reviewId,
        updateReviewDto,
      );

      // Assert
      expect(result).toEqual(existingReview);
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id: gameId });
      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        id: reviewId,
        gameId: gameId,
      });
      expect(reviewRepository.save).toHaveBeenCalledWith({
        ...existingReview,
        ...updateReviewDto,
      });
    });

    it('should throw NotFoundException when game is not found', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;
      const updateReviewDto: UpdateReviewDto = {
        title: 'Updated Game',
        content: 'This game is still awesome!',
        rating: 4,
        pros: 'Graphics are still amazing',
        cons: 'None',
      };

      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.updateReviewForGame(gameId, reviewId, updateReviewDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException when review is not found', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;
      const updateReviewDto: UpdateReviewDto = {
        title: 'Updated Game',
        content: 'This game is still awesome!',
        rating: 4,
        pros: 'Graphics are still amazing',
        cons: 'None',
      };

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(existingGame);
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.updateReviewForGame(gameId, reviewId, updateReviewDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteReviewForGame', () => {
    it('should delete a review for a game', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOne').mockResolvedValue(existingGame);

      const existingReview = new Review();
      jest.spyOn(reviewRepository, 'remove').mockResolvedValue(null);

      // Act
      await gameService.deleteReviewForGame(gameId, reviewId);

      // Assert
      expect(gameRepository.findOne).toHaveBeenCalledWith(gameId);
      expect(reviewRepository.findOne).toHaveBeenCalledWith({
        id: reviewId,
        gameId: gameId,
      });
      expect(reviewRepository.remove).toHaveBeenCalledWith(existingReview);
    });

    it('should throw NotFoundException when game is not found', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;

      jest.spyOn(gameRepository, 'findOne').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.deleteReviewForGame(gameId, reviewId),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException when review is not found', async () => {
      // Arrange
      const gameId = 1;
      const reviewId = 1;

      const existingGame = new Game();
      jest.spyOn(gameRepository, 'findOne').mockResolvedValue(existingGame);
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(undefined);

      // Act and Assert
      await expect(
        gameService.deleteReviewForGame(gameId, reviewId),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
