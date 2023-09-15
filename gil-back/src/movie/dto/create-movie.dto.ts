import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../enums/genre-enum';
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Title of the movie',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Director of the movie',
  })
  director: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Movie Released Year',
  })
  releaseYear: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Summary of the movie',
  })
  summary: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  @ApiProperty({
    description: "Movie's genre",
  })
  genre: Genre;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Movie's language",
  })
  language: string;
}
