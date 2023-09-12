// game.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  releaseDate: string;

  @Column('text', { array: true })
  genres: string[];

  @Column('text', { array: true })
  platforms: string[];
}
