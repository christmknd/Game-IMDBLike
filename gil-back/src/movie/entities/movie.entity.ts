import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from '../enums/genre-enum';


@Entity({name : 'movie'})
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'Default Title' })
  title: string;

  @Column({ type: 'varchar', nullable: false, default: 'Default director' })
  director: string;

  @Column({ type: 'year' })
  releaseYear: number;

  @Column({ type: 'varchar', nullable: false, default: 'Default summary' })
  summary: string;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @Column({ type: 'varchar', nullable: false, default: 'Français' })
  language: string;
}
