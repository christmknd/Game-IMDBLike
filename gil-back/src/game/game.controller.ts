import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Game } from "./entities/game.entity";
import { Role } from "../users/enums/role.enum";
import { Roles } from "../auth/decorators/roles.decorators";
import { JwtAuthGuard } from "../auth/jwt-auth.guards";
import { Review } from "../review/entities/review.entity";
import { UpdateReviewDto } from "../review/dto/update-review.dto";
import { CreateReviewDto } from "../review/dto/create-review.dto";
import { RolesGuard } from "../auth/guards/RolesGuard";


@ApiTags('game')
@Controller('game')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {
  }

  @ApiOperation({ summary: 'Create a new game' })
  @ApiBody({ type: CreateGameDto })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    type: Game,
  })
  @ApiBadRequestResponse({ description: 'Game cannot be registrated' })
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    try {
      return this.gameService.createGame(createGameDto);
    } catch {
      throw new BadRequestException('Game cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({
    status: 200,
    description: 'Return all games',
    type: Game,
  })
  @ApiNotFoundResponse({ description: 'No games were found' })
  @Roles(Role.Player, Role.Admin)
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
  @Roles(Role.Player)
  @Roles(Role.Admin)
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
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gameService.updateGame(+id, updateGameDto);
    } catch {
      throw new NotFoundException('Game not found : Game cannot be updated');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete game by ID' })
  @Roles(Role.Player)
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    try {
      return this.gameService.deleteGame(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch {
      throw new NotFoundException('Game not found : Game cannot be deleted')
    }
  }

  @ApiOperation({ summary: 'Add  review  by game ID' })
  @ApiParam({ name: 'gameId', description: 'ID of the game' })
  @ApiCreatedResponse({ description: 'Review has been successfully created', type: Review })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @Post(':gameId/review')
  async addReviewToGame(
    @Param('gameId') gameId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    try {
      return this.gameService.addReviewToGame(gameId, createReviewDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find all the  reviews for a specific game ID' })
  @ApiParam({ name: 'gameId', description: 'ID of the game' })
  @ApiOkResponse({ description: 'All reviews for the game', type: Review, isArray: true })
  @Get(':gameId/reviews')
  async findAllReviewsForGame(
    @Param('gameId') gameId: number,
  ): Promise<Review[]> {
    try {
      return this.gameService.findAllReviewsForGame(gameId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Find  the  review for a specific game ID' })
  @ApiParam({ name: 'gameId', description: 'ID of the game' })
  @ApiParam({ name: 'reviewId', description: 'ID of the review' })
  @ApiOkResponse({ description: 'Review found', type: Review })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Get(':gameId/review/:reviewId')
  async findReviewByIdForGame(
    @Param('gameId') gameId: number,
    @Param('reviewId') reviewId: number,
  ): Promise<Review> {
    try {
      return this.gameService.findReviewByIdForGame(gameId, reviewId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Update review  by game ID' })
  @ApiParam({ name: 'gameId', description: 'ID of the game' })
  @ApiParam({ name: 'reviewId', description: 'ID of the review' })
  @ApiOkResponse({ description: 'Review has been successfully updated', type: Review })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Patch(':gameId/review/:reviewId')
  async updateReviewForGame(
    @Param('gameId') gameId: number,
    @Param('reviewId') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    try {
      return this.gameService.updateReviewForGame(
        gameId,
        reviewId,
        updateReviewDto,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}