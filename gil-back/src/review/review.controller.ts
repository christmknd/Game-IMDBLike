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
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { AuthGuard } from '../auth/auth.guards';
import { Roles } from '../roles.decorator';
import { Role } from '../users/enums/role.enum';

@ApiTags('review')
@UseGuards(AuthGuard) 
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
  @Roles(Role.User)
  @ApiBadRequestResponse({ description: 'Review cannot be registrated' })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    try {
      return this.reviewService.createReview(createReviewDto);
    } catch {
      throw new BadRequestException('Review cannot be registrated')
    }
  }

  @ApiOperation({ summary: 'Get all reviews' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  @Roles(Role.User, Role.Admin)
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
  @ApiResponse({
    status: 200,
    description: 'Return review by ID',
    type: Review,
  })
  @Roles(Role.User, Role.Admin)
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Get(':id')
  findReviewById(@Param('id') id: string) {
    try {
      return this.reviewService.findReviewById(+id);
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
  @Roles(Role.Admin, Role.User)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      return this.reviewService.updateReview(+id, updateReviewDto);
    } catch {
      throw new NotFoundException('Review not found : cannot be updated');
    }
  }

  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiNotFoundResponse({ description: 'Review not found : cannot be deleted' })
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.reviewService.deleteReview(+id);
    } catch {
      throw new NotFoundException('Review not found : cannot be deleted')
    }
  }

}
