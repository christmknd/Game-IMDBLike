<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

=======
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Bookmark } from './entities/bookmark.entity';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';

@ApiTags('bookmark')
>>>>>>> e5c5a18bebc921e3d78859f4011578bb4d57d007
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

<<<<<<< HEAD
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
=======
  @ApiOperation({ summary: 'Initialize bookmark' })
  @ApiBody({ type: CreateBookmarkDto })
  @ApiResponse({
    status: 201,
    description: 'Bookmark created successfully',
    type: Bookmark,
  })
  @ApiBadRequestResponse({ description: 'Bookmark cannot be registrated' })
  @Post()
  @Roles(Role.Player)
  @Roles(Role.Admin)
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    try {
      return this.bookmarkService.createBookmark(createBookmarkDto);
    } catch {
      throw new BadRequestException('Bookmark cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all games in Bookmark' })
  @ApiNotFoundResponse({
    description: 'No games found : the Bookmark is maybe empty',
  })
  @Roles(Role.Player)
  @Roles(Role.Admin)
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

  @ApiOperation({ summary: 'Get bookmark by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return bookmark by ID',
    type: Bookmark,
  })
  @ApiNotFoundResponse({ description: 'Bookmark not found' })
  @Get(':id')
  @Roles(Role.Player)
  @Roles(Role.Admin)
  findBookmarkById(@Param('id') id: number) {
    try {
      return this.bookmarkService.findBookmarkById(+id);
    } catch {
      throw new NotFoundException(`Bookmark with id ${id} not found `);
    }
  }

  @ApiOperation({ summary: 'Add game to bookmark' })
  @ApiParam({ name: 'bookmarkId', type: Number })
  @ApiParam({ name: 'gameId', type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
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

  @ApiOperation({ summary: 'Delete game to bookmark' })
  @ApiParam({ name: 'bookmarkId', type: Number })
  @ApiParam({ name: 'gameId', type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
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
  @ApiOperation({ summary: 'Delete bookmark by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Bookmark deleted successfully' })
  @ApiNotFoundResponse({
    description: 'Bookmark not found : cannot be deleted',
  })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Player)
  @Roles(Role.Admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.bookmarkService.deleteBookmark(+id);
    } catch {
      throw new NotFoundException(`Bookmark cannot be deleted`);
    }
>>>>>>> e5c5a18bebc921e3d78859f4011578bb4d57d007
  }
}
