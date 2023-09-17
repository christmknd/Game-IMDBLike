import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { Genre } from '../enums/genre-enum';
import { Platform } from '../enums/platform-enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type : 'varchar', nullable: false, default: 'Name'})
  @ApiProperty({
    description: 'Name of the Game',
    default : 'Name'
  })
  name: string;

  @Column({type : 'year', default : 2000})
  @ApiProperty({
    description: 'Release Year of the Game',
    default : 2000
  })
  releaseYear: number;

  @Column({type: 'enum', enum: Genre })
  @ApiProperty({
    description: 'Genre of the Game',
  })
  genres: Genre;


  @Column({type: 'enum', enum: Platform })
  @ApiProperty({
    description: 'Game Principal Platform',
  })
  platform: Platform;


  //Un jeu peut avoir plusieurs reviews (de différents utilisateurs).
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];

}


