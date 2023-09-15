import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from '../enums/genre-enum';
import { Review } from "../../review/entities/review.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: 'movie'})
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Summary of the movie',
  })
  @Column({ type: 'varchar', nullable: false, default: 'Default Title' })
  title: string;

  @ApiProperty({
    description: 'Director of the movie',
  })
  @Column({ type: 'varchar', nullable: false, default: 'Default director' })
  director: string;

  @ApiProperty({
    description: 'Movie Released Year',
  })
  @Column({ type: 'year' })
  releaseYear: number;

  @ApiProperty({
    description: 'Summary of the movie',
  })
  @Column({ type: 'varchar', nullable: false, default: 'Default summary' })
  summary: string;

  @ApiProperty({
    description: "Movie's genre",
  })
  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @ApiProperty({
    description: "Movie's language",
  })
  @Column({ type: 'varchar', nullable: false, default: 'Français' })
  language: string;


  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

}
