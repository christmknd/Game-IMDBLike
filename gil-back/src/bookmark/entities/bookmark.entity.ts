<<<<<<< HEAD
export class Bookmark {}
=======
import { Game } from '../../game/entities/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'bookmark' })
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
>>>>>>> e5c5a18bebc921e3d78859f4011578bb4d57d007
