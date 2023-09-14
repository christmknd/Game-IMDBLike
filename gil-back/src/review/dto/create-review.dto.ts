import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateReviewDto {
  @ApiProperty({
    description: 'Content of the review',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Rating for the book',
  })
  @IsNotEmpty()
  rating: string;
}