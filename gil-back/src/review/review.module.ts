import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Game])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
