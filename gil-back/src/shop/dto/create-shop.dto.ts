import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({
    description: 'Title of the shop'
  })
  @IsNotEmpty()
  title: string;
}
