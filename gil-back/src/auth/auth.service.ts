import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    /*const additionalInfo = {
      user_id: user.id,
      username: user.username,
      email: user.email,
      player_type: user.player_type,
      favorite_platform: user.favorite_platform,
      favorite_genre: user.favorite_genre,
      favorite_mode: user.favorite_mode,
    };
    
     */
    return {
      access_token: this.jwtService.sign(payload),
      /*...additionalInfo,*/
    };
  }

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);

    if (newUser) {
      const payload = { username: newUser.username, sub: newUser.id };
      const accessToken = this.generateJwtToken(payload);
      return { user: newUser, access_token: accessToken };
    }

    return null;
  }

  async generateRefreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      // Vous pouvez ajouter ici des validations supplémentaires si nécessaire.
      return decoded;
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
