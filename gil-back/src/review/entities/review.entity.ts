import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, /*ManyToOne*/ PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsString, Max, Min } from 'class-validator';
import { Game } from "../../game/entities/game.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  @IsString()
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  @IsString()
  content: string;

  @Column({ type: 'int', nullable: false })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  //points négatifs
  @Column({ type: 'varchar', nullable: false, length: 255 })
  @IsString()
  pros: string;

  //points négatifs
  @Column({ type: 'varchar', nullable: false, length: 255 })
  @IsString()
  cons: string;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @ManyToOne(() => Game, (game) => game.reviews)
  game: Game;

}
