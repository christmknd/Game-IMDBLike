import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'Title of the Bookmark ',
    default: 'Favoris',
  })
  @IsNotEmpty()
  name: string;
}
