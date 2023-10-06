import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { Review } from '../../review/entities/review.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Platform } from '../../game/enums/platform-enum';
import { Genre } from '../../game/enums/genre-enum';
import { Playertype } from '../enums/playertype.enum';
import { PlayerMode } from '../enums/playermode.enum';
import { Role } from '../enums/role.enum';

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

  @Column({ type: 'varchar' })
  @IsEmail()
  email: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Column({ type: 'enum', enum: Playertype })
  @IsEnum(Playertype)
  player_type: Playertype;

  @Column({ type: 'enum', enum: PlayerMode })
  favorite_mode: PlayerMode;

  @Column({ type: 'enum', enum: Role, default: Role.Player })
  @IsEnum(Role)
  roles: Role;

  //  un utilisateur ne peut déposer qu'une seule review sur un movie, un book ou un game.
  @OneToMany(() => Review, (review) => review.user)
  review: Review;
}
