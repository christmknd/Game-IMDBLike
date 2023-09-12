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

  @Column('json')
  genres: string;

  @Column('json')
  platforms: string;
}
