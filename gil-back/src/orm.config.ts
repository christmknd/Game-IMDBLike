import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Review } from './review/entities/review.entity';
import { User } from './users/entities/user.entity';
import { Game } from './game/entities/game.entity';


dotenv.config();


const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Game, User, Review],
  synchronize: true
}

export default config;
