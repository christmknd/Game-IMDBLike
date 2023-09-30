import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException, UseGuards
} from "@nestjs/common";
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Review } from './entities/review.entity';
import { JwtAuthGuard } from "../auth/jwt-auth.guards";
import { Roles } from "../auth/decorators/roles.decorators";
import { Role } from "../auth/enums/role.enum";

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

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

  @Post(':id/reviews')
  @ApiOperation({ summary: 'Add review to a game' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  addReviewToGame(@Param('id') gameId: number, @Body() createReviewDto: CreateReviewDto) {
    try {
      return this.reviewService.addReviewToGame(gameId, createReviewDto);
    } catch {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }
  }

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

  @ApiOperation({ summary: 'Get review by ID' })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Return review by ID',
    type: Review,
  })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Get(':id')
  findReviewById(@Param('id') id: string, gameId: number) {
    try {
      return this.reviewService.findReviewById(+id, gameId);
    } catch {
      throw new NotFoundException('Review not found');
    }
  }

  @ApiOperation({ summary: 'Update review by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
    type: Review,
  })
  @ApiNotFoundResponse({ description: 'Review not found : cannot be updated' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.reviewService.updateReview(+id, updateReviewDto);
    } catch {
      throw new NotFoundException('Review not found : cannot be updated');
    }
  }

  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiNotFoundResponse({ description: 'Review not found : cannot be deleted' })
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.reviewService.deleteReview(+id);
    } catch {
      throw new NotFoundException('Review not found : cannot be deleted');
    }
  }
}
