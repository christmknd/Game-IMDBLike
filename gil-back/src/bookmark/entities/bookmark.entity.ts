import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { User } from '../../users/entities/user.entity';

@Entity('bookmark')
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @ManyToOne(() => Game, (game) => game.bookmarks)
  games: Game[];
}
