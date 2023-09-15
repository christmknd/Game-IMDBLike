import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id: id });
    if (!movie) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return movie;
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id: id });
    Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.movieRepository.findOneBy({ id: id });
    await this.movieRepository.delete(movie);
  }
}
