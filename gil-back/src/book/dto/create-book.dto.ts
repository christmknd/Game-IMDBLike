import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from "class-validator";
import { Genre } from '../enums/genre-enum';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Author of the book',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({ type: 'enum', enum: Genre })
  @IsNotEmpty()
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty({
    description: 'Quick description of the book',
  })
  description: string;
}