import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReviewModule } from './review/review.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ThrottlerModule } from '@nestjs/throttler';
import config from './orm.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';

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
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
