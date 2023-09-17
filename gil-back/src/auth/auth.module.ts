import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
      signOptions: {expiresIn: '1h'}
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
