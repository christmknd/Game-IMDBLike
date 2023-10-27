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
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../users/enums/role.enum';
import { RolesGuard } from '../auth/guards/RolesGuard';
@ApiTags('review')
@Controller('review')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
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

  //Lire toutes les reviews qui existent sur la plateforme
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  @Roles(Role.Admin)
  @Roles(Role.Player)
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
  @Roles(Role.Admin)
  @Roles(Role.Player)
  @ApiResponse({
    status: 200,
    description: 'Return review by ID',
    type: Review,
  })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Get(':id')
  findReviewById(@Param('id') id: number) {
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
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
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
  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.reviewService.deleteReview(+id);
    } catch {
      throw new NotFoundException('Review not found : cannot be deleted');
    }
  }
}
