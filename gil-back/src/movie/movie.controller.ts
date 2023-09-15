import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Create a new movie' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: 201,
    description: 'Movie created successfully',
    type: Movie,
  })
  @ApiBadRequestResponse({ description: 'Movie cannot be registrated' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    try {
      return this.movieService.createMovie(createMovieDto);
    } catch {
      throw new BadRequestException('Movie cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all Movies' })
  @ApiNotFoundResponse({ description: 'No Movies found' })
  @Get()
  findAll() {
    try {
      return this.movieService.findAllMovies();
    } catch {
      throw new NotFoundException('No Movies found');
    }
  }


  @ApiOperation({ summary: 'Get Movie by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return Movie by ID',
    type: Movie,
  })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  @Get(':id')
  findMovieById(@Param('id') id: number) {
    console.log('ID reçu:', id);
    try {
      return this.movieService.findMovieById(id);
    } catch {
      throw new NotFoundException('Movie not found');
    }
  }

  @ApiOperation({ summary: 'Update Movie by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
    type: Movie,
  })
  @ApiNotFoundResponse({ description: 'Movies not found : cannot be updated' })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie(+id, updateMovieDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.movieService.deleteMovie(+id);
    } catch {

    }
  }
}
