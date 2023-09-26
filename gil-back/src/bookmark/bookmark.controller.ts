import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    try {
      return this.bookmarkService.createBookmark(createBookmarkDto);
    } catch {
      throw new BadRequestException('Bookmark cannot be registrated')
    }
  }

  @Get()
  findAllBookmarks() {
    try {
      return this.bookmarkService.findAllBookmarks();
    } catch {
      throw new NotFoundException(
        'No games found : the Bookmark is maybe empty',
      );
    }
  }

  @Get(':bookmarkId/games')
  findAllGamesInBookmark(@Param('bookmarkId') bookmarkId: number) {
    try {
      return this.bookmarkService.findAllGamesInBookmark(bookmarkId);
    } catch {
      throw new NotFoundException(
        'No games found : the Bookmark is maybe empty',
      );
    }
  }

  @Get(':id')
  findBookmarkById(@Param('id') id: string) {
    try {
      return this.bookmarkService.findBookmarkById(+id);
    } catch {
      throw new NotFoundException(`Games with id ${id} not found `);
    }
  }

  @Post(':bookmarkId/add-game/:gameId')
  addGameToBookmark(
    @Param('bookmarkId') bookmarkId: number,
    @Param('gameId') gameId: number,
  ) {
    try {
      return this.bookmarkService.addGameToBookmark(bookmarkId, gameId);
    } catch {
      throw new NotFoundException(
        'Cannot add the game from the bookmark : the game may not exist',
      );
    }
  }


  @Delete(':bookmarkId/delete-game/:gameId')
  deleteGameFromBookmark(
    @Param('bookmarkId') bookmarkId: number,
    @Param('gameId') gameId: number,
  ) {
    try {
      return this.bookmarkService.deleteGameFromBookmark(bookmarkId, gameId);
    } catch {
      throw new NotFoundException(
        'Cannot delete the game from the bookmark : the game may not exist',
      );
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.bookmarkService.deleteBookmark(+id);
    } catch {
      throw new NotFoundException(`Bookmark cannot be deleted`);
    }
  }
}