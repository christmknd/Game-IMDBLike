// game.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';

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

  @OneToMany(() => Bookmark, (bookmark) => bookmark.game)
  bookmarks: Bookmark[];
}
