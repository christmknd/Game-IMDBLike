// game.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  releaseDate: string;

  @Column()
  genres: string;

  @Column()
  platforms: string;


  //Un jeu peut avoir plusieurs reviews (de différents utilisateurs).
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];

}
