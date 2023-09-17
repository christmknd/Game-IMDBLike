import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Genre } from '../enums/genre-enum';
import { Platform } from '../enums/platform-enum';

export class CreateGameDto {
  @ApiProperty({ description: 'Game Title' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Released Year of the game' })
  @IsNotEmpty()
  @IsInt()
  releaseYear: number;

  @ApiProperty({ type: 'enum', enum: Genre })
  @IsEnum(Genre)
  genres: Genre;

  @ApiProperty({ type: 'enum', enum: Platform })
  @IsEnum(Platform)
  platforms: Platform;
}
