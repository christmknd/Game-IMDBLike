import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game/entities/game.entity';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { Bookmark } from './bookmark/entities/bookmark.entity';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889, //3306 || 8889
      username: 'root',
      password: 'root', //mtae123
      database: 'gameapp',
      entities: [Game, Shop, User, Review, Bookmark],
      logging: true,
      synchronize: true,
      migrations: ['dist/migrations/*js'],
    }),
    GameModule,
    ShopModule,
    UsersModule,
    ReviewModule,
    BookmarkModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
