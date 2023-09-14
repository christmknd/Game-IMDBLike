// game.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
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

  //Les jeux sont ajoutés par les utilisateurs.
  @ManyToOne(() => User, (user) => user.games)
  user: User;

  //Un jeu peut avoir plusieurs reviews (de différents utilisateurs).
  @OneToMany(() => Review, (review) => review.games)
  reviews: Review[];

  //Un jeu peut être bookmarké par plusieurs utilisateurs (être dans leurs favoris).
  @OneToMany(() => Bookmark, (bookmark) => bookmark.games)
  bookmarks: Bookmark[];
}
