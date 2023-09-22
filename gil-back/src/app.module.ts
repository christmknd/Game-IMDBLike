import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReviewModule } from './review/review.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    GameModule,
    UsersModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
