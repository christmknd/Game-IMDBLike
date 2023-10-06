import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReviewModule } from './review/review.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import config from './orm.config';
import { RolesGuard } from './auth/guards/RolesGuard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from "./auth/jwt-auth.guards";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
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
/*
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
