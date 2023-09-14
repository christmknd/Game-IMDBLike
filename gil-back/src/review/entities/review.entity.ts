import { Column, Entity, /*ManyToOne*/ PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString, Max, Min } from 'class-validator';
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

  /*
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
  */
}
