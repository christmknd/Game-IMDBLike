import { Column, Entity, ManyToOne, /*ManyToOne*/ PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsString, Max, Min } from 'class-validator';
import { Game } from "../../game/entities/game.entity";
import { User } from "../../users/entities/user.entity";
import { Book } from "../../book/entities/book.entity";
import { Movie } from "../../movie/entities/movie.entity";
//import { User } from "../../users/entities/user.entity";

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  @IsString()
  content: string;

  @Column({ type: 'int', nullable: false })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;

  @ManyToOne(() => Game, (game) => game.reviews)
  game: Game;

}
