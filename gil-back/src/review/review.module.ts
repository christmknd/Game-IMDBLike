import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../game/entities/game.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Game, User])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
