import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'User lastname',
  })
  @IsString()
  @MinLength(6)
  lastname: string;

  @ApiProperty({
    description: 'User firstname',
  })
  @IsString()
  @MinLength(6)
  firstname: string;

  @ApiProperty({
    description: 'User pseudo',
  })
  @IsString()
  @MinLength(6)
  pseudo: string;

  @ApiProperty({
    description: 'user password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
