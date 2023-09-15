import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../enums/genre-enum';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsInt()
  releaseYear: number;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  genre: Genre;

  @IsNotEmpty()
  @IsString()
  language: string;
}
