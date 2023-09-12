import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ description: 'Game Title' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Released Date of the game' })
  @IsNotEmpty()
  releasedDate: string;

  @ApiProperty({ description: 'Genre(s) of the game' })
  genres: string[];

  @ApiProperty({ description: 'Platform(s) you can play the game on' })
  platforms: string[];
}
