import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({type: 'varchar'})
  @IsEmail()
  email : string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  //  un utilisateur ne peut déposer qu'une seule review sur un movie, un book ou un game.
  @OneToMany(() => Review, (review) => review.user)
  review: Review;
}
