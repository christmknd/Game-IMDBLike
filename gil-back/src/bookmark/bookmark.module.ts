import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Game])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
