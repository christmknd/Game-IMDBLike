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
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiTags('Game')
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    try {
      return this.gameService.createGame(createGameDto);
    } catch {
      throw new BadRequestException('Game cannot be registrated');
    }
  }

  @Get()
  findAll() {
    try {
      return this.gameService.findAllGames();
    } catch {
      throw new NotFoundException('No games were found')
    }
  }

  @Get(':id')
  findGameById(@Param('id') id: number) {
    try {
      return this.gameService.findGameById(+id);
    } catch {
      throw new NotFoundException('Game not found');
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gameService.updateGame(+id, updateGameDto);
    } catch {
      throw new NotFoundException('Game not found : Game cannot be updated');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.gameService.deleteGame(+id);
    } catch {
      throw new NotFoundException('Game not found : Game cannot be deleted')
    }
  }
}
