import {
  Column,
  Entity,
  /* ManyToOne, OneToMany,*/
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Genre } from '../enums/genre-enum';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'Default Title' })
  @IsString()
  title: string;


  @Column({ type: 'varchar', nullable: false , default: 'Default Author' })
  @IsString()
  author: string;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;


  @Column({ type: 'varchar', length: 255, nullable: false, default: 'Default Description' })
  @IsString()
  description: string;

  /*
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

   */
}
