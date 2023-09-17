import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
//import { Roles } from './roles.decorator';
import { AuthGuard } from './auth.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(
      createUserDto.username,
      createUserDto.password,
    );
  }
}

