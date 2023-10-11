import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Review } from '../review/entities/review.entity';
import { User } from '../users/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({
  imports: [TypeOrmModule.forFeature([Game, Review, User])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
