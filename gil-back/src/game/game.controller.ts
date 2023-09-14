import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation, ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Game } from './entities/game.entity';
import { CreateReviewDto } from '../review/dto/create-review.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOperation({ summary: 'Create a new game' })
  @ApiBody({ type: CreateGameDto })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: Game,
  })
  @ApiBadRequestResponse({ description: 'Game cannot be registrated' })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    try {
      return this.gameService.createGame(createGameDto);
    } catch {
      throw new BadRequestException('Game cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all games' })
  @ApiNotFoundResponse({ description: 'No games were found' })
  @Get()
  findAll() {
    try {
      return this.gameService.findAllGames();
    } catch {
      throw new NotFoundException('No games were found')
    }
  }

  @ApiOperation({ summary: 'Get game by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return game by ID',
    type: Game,
  })
  @ApiNotFoundResponse({ description: 'Game not found' })
  @Get(':id')
  findGameById(@Param('id') id: number) {
    try {
      return this.gameService.findGameById(+id);
    } catch {
      throw new NotFoundException('Game not found');
    }
  }


  @ApiOperation({ summary: 'Update game by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateGameDto })
  @ApiResponse({
    status: 200,
    description: 'Game updated successfully',
    type: Game,
  })
  @ApiNotFoundResponse({ description: 'Game not found : Game cannot be updated' })

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gameService.updateGame(+id, updateGameDto);
    } catch {
      throw new NotFoundException('Game not found : Game cannot be updated');
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.gameService.deleteGame(+id);
    } catch {
      throw new NotFoundException('Game not found : Game cannot be deleted')
    }
  }

  @Post(':id/reviews')
  addReviewToGame(@Param('id') gameId: number, @Body() createReviewDto: CreateReviewDto) {
    try {
      return this.gameService.addReviewToGame(gameId, createReviewDto);
    } catch {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
  }
}
