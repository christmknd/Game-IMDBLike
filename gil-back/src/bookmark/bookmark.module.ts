import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
<<<<<<< HEAD

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService]
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Game])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
>>>>>>> e5c5a18bebc921e3d78859f4011578bb4d57d007
})
export class BookmarkModule {}
