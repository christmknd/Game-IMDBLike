import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Playertype } from '../enums/playertype.enum';
import { Genre } from '../../game/enums/genre-enum';
import { Platform } from '../../game/enums/platform-enum';
import { PlayerMode } from '../enums/playermode.enum';

export class CreateUserDto {


  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: 'user password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: 'enum', enum: Playertype })
  @IsEnum(Playertype)
  player_type: Playertype;

  @ApiProperty({ type: 'enum', enum: Platform })
  @IsEnum(Platform)
  favorite_platform: Platform;

  @ApiProperty({ type: 'enum', enum: Genre })
  @IsEnum(Genre)
  favorite_genre: Genre;

  @ApiProperty({ type: 'enum', enum: PlayerMode })
  favorite_mode: PlayerMode;


}
