import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Review } from '../review/entities/review.entity';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;
  let reviewRepository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );

    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });
});
