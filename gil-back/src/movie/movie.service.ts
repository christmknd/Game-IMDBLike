import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewDto } from "../review/dto/create-review.dto";
import { Review } from "../review/entities/review.entity";

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
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

  async addReviewToMovie(
    id: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const movie = await this.movieRepository.findOneBy({ id: id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const review = new Review();
    review.content = createReviewDto.content;
    review.rating = createReviewDto.rating;
    review.movie = movie; // Associez la review au jeu

    return this.reviewRepository.save(review);
  }
}
