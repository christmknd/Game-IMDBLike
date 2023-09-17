import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game/entities/game.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guards';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889, //3306 || 8889
      username: 'root',
      password: 'root', //mtae123 || root
      database: 'gameapp',
      entities: [Game, User, Review],
      logging: true,
      synchronize: true,
      migrations: ['dist/migrations/*js'],
    }),
    GameModule,
    UsersModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
