import { Game } from '../../game/entities/game.entity';
import { Column, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Favoris', nullable: false })
  name: string;

  // Relation OneToOne avec l'utilisateur
  @OneToOne(() => User)
  @JoinColumn()
  user: User;


  // Relation ManyToMany avec les jeux (ou livres) favoris
  @ManyToMany(() => Game)
  @JoinTable()
  favorites: Game[];
}
