import { ApiProperty } from '@nestjs/swagger';
import { Playertype } from '../enums/playertype.enum';
import { IsEnum } from 'class-validator';
import { Platform } from '../../game/enums/platform-enum';
import { Genre } from '../../game/enums/genre-enum';
import { PlayerMode } from '../enums/playermode.enum';

export class AddUserInfoDto {
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
