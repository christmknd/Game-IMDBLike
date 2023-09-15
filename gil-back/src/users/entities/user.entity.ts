import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bookmark } from "../../bookmark/entities/bookmark.entity";
import { Game } from "../../game/entities/game.entity";
import { Review } from "../../review/entities/review.entity";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  username: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ type: 'varchar', nullable: false })
  password: string;

  //Un utilisateur peut ajouter un ou plusieurs jeux à la plateforme
  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  // Un utilisateur peut ajouter une review par jeu , mais pleusieurs reviews à la plaetofmre
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  //Un jeu peut être bookmarké par plusieurs utilisateurs (être dans leurs favoris).
  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
