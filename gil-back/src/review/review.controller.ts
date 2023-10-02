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
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../auth/enums/role.enum';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //créer une review
  @ApiOperation({ summary: 'Create a new review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    type: Review,
  })
  @ApiBadRequestResponse({ description: 'Review cannot be registrated' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    try {
      return this.reviewService.createReview(createReviewDto);
    } catch {
      throw new BadRequestException('Review cannot be registrated');
    }
  }

  //ajouter une review à un jeu
  @Post(':gameId/review')
  @ApiOperation({ summary: 'Add review to a game' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  addReviewToGame(
    @Param('id') gameId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      return this.reviewService.addReviewToGame(gameId, createReviewDto);
    } catch {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
  }

  //Lire toutes les reviews qui existent sur la plateforme
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    try {
      return this.reviewService.findAllReviews();
    } catch {
      throw new NotFoundException('No reviews found');
    }
  }

  // Lire toutes les critiques d'un jeu
  @ApiOperation({ summary: 'Get all reviews of a game' })
  @ApiParam({ name: 'gameId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return all reviews of a game',
    type: Review,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Game not found' })
  @Get(':gameId/reviews')
  async findAllReviewsByGameId(@Param('gameId') gameId: number) {
    try {
      return this.reviewService.findAllReviewsByGameId(gameId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Game with ID ${gameId} not found`);
      }
      throw error;
    }
  }

  // Lire une critique spécifique d'un jeu
  @ApiOperation({ summary: 'Get a specific review of a game' })
  @ApiParam({ name: 'gameId', type: Number })
  @ApiParam({ name: 'reviewId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return a specific review of a game',
    type: Review,
  })
  @ApiNotFoundResponse({ description: 'Game not found or Review not found' })
  @Get(':gameId/review/:reviewId')
  async findReviewByGameIdAndReviewId(
    @Param('gameId') gameId: number,
    @Param('reviewId') reviewId: number,
  ) {
    try {
      return this.reviewService.findReviewByGameIdAndReviewId(gameId, reviewId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Game with ID ${gameId} or Review with ID ${reviewId} not found`,
        );
      }
      throw error;
    }
  }

  // Mettre à jour une critique d'un jeu
  @ApiOperation({ summary: 'Update a review of a game' })
  @ApiParam({ name: 'gameId', type: Number })
  @ApiParam({ name: 'reviewId', type: Number })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
    type: Review,
  })
  @ApiNotFoundResponse({ description: 'Game not found or Review not found' })
  @Patch(':gameId/review/:reviewId')
  async updateReviewByGameIdAndReviewId(
    @Param('gameId') gameId: number,
    @Param('reviewId') reviewId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      return this.reviewService.updateReviewByGameIdAndReviewId(
        gameId,
        reviewId,
        createReviewDto,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Game with ID ${gameId} or Review with ID ${reviewId} not found`,
        );
      }
      throw error;
    }
  }

  // Supprimer une critique d'un jeu
  @ApiOperation({ summary: 'Delete a review of a game' })
  @ApiParam({ name: 'gameId', type: Number })
  @ApiParam({ name: 'reviewId', type: Number })
  @ApiResponse({
    status: 204,
    description: 'Review deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Game not found or Review not found' })
  @Delete(':gameId/review/:reviewId')
  async deleteReviewByGameIdAndReviewId(
    @Param('gameId') gameId: number,
    @Param('reviewId') reviewId: number,
  ) {
    try {
      await this.reviewService.deleteReviewByGameIdAndReviewId(
        gameId,
        reviewId,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Game with ID ${gameId} or Review with ID ${reviewId} not found`,
        );
      }
      throw error;
    }
  }
}
