import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Review } from 'src/review/entities/review.entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({
  imports: [TypeOrmModule.forFeature([Game, Review])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
