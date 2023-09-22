import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ description: 'User registered succesfully !' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.register(createUserDto);
      return console.log('User registered succesfully !');
    } catch {
      throw new BadRequestException('Bad Reqquest : User registration failed');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch {
      throw new UnauthorizedException('Invalid or incorrect credentials');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile')
  @ApiResponse({
    status: 200,
    description: 'Access to our profile page granted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUserProfile(@Request() req) {
    try {
      return req.user;
    } catch {
      throw new UnauthorizedException(
        'You are not authorized to go on this page',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  async refreshAccessToken(@Request() req) {
    const user = req.user;
    const accessToken = this.authService.generateRefreshToken(user);

    return { access_token: accessToken };
  }
}
