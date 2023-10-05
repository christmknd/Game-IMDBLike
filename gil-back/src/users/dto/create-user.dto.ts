import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Playertype } from '../enums/playertype.enum';
import { PlayerMode } from '../enums/playermode.enum';

export class CreateUserDto {


  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  @IsString()
  email: string;


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

  @ApiProperty({ type: 'enum', enum: PlayerMode })
  favorite_mode: PlayerMode;



}
