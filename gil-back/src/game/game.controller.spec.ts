import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { NotFoundException } from '@nestjs/common';
import { Genre } from './enums/genre-enum';
import { Platform } from './enums/platform-enum';

// Mocks
const mockGames: Game[] = [
  {
    id: 1,
    name: 'Game 1',
    releaseYear: 2023,
    genres: Genre.Action,
    platform: Platform.PlayStation_4,
    reviews: [],
  },
  {
    id: 2,
    name: 'Game 2',
    releaseYear: 2022,
    genres: Genre.Aventure,
    platform: Platform.Xbox_One,
    reviews: [],
  },
];

const mockGameService = {
  findAllGames: jest.fn().mockResolvedValue(mockGames),
  createGame: jest.fn().mockImplementation((newGame: CreateGameDto) => {
    return { id: 3, ...newGame };
  }),
  findGameById: jest.fn().mockImplementation((id: number) => {
    const game = mockGames.find((g) => g.id === id);
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }),
  updateGame: jest
    .fn()
    .mockImplementation((id: number, updateGameDto: UpdateGameDto) => {
      const game = mockGames.find((g) => g.id === id);
      if (!game) {
        throw new NotFoundException(
          `Game with ID ${id} not found : Game cannot be updated`,
        );
      }
      return { ...game, ...updateGameDto };
    }),
  deleteGame: jest.fn().mockImplementation((id: number) => {
    const index = mockGames.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Game with ID ${id} not found : Game cannot be deleted`,
      );
    }
    mockGames.splice(index, 1);
    return { raw: [], affected: 1 };
  }),
};

describe('GameController', () => {
  let gameController: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    })
      .overrideProvider(GameService)
      .useValue(mockGameService)
      .compile();

    gameController = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(gameController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      const result = await gameController.findAll();
      expect(result).toEqual(mockGames);
    });
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const newGameDto: CreateGameDto = {
        name: 'New Game',
        releaseYear: 2024,
        genres: Genre.RPG,
        platform: Platform.PC,
      };

      const result = await gameController.create(newGameDto);
      expect(result).toEqual({ id: 3, ...newGameDto });
    });
  });

  describe('findGameById', () => {
    it('should return a game by ID', async () => {
      const gameId = 1;
      const result = await gameController.findGameById(gameId);
      expect(result).toEqual(mockGames[0]);
    });
  });

  describe('update', () => {
    it('should update a game by ID', async () => {
      const gameId = 1;
      const updateGameDto: UpdateGameDto = {
        name: 'Updated Game',
      };

      const result = await gameController.update(gameId, updateGameDto);
      expect(result).toEqual({ ...mockGames[0], ...updateGameDto });
    });
  });

  describe('delete', () => {
    it('should delete a game by ID', async () => {
      const gameId = 1;
      const result = await gameController.delete(gameId);
      expect(result).toEqual({ raw: [], affected: 1 });
    });
  });
});
