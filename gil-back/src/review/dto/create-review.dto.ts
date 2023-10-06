import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateReviewDto {

  @ApiProperty({ description: 'Title of the review', })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Content of the review', })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'Rating for the review', })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ description : 'Pros of the game'})
  @IsString()
  pros: string;

  @ApiProperty({ description: 'Cons of the game'})
  @IsString()
  cons: string;
}