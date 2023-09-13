import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game/entities/game.entity';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mtae123',
      database: 'gameapp',
      entities: [Game, Shop],
      logging: true,
      synchronize: false,
      migrations: ['dist/migrations/*js'],
    }),
    GameModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
