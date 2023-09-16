import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'password',
      };

      const existingUser = null; 
      const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);
      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue(hashedPassword);

      const newUser = new User();
      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await authService.register(createUserDto);

      expect(result).toBe(newUser);
    });

    it('should throw UnauthorizedException when username is taken', async () => {
      const createUserDto: CreateUserDto = {
        username: 'existinguser',
        password: 'password',
      };

      const existingUser = new User(); 

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      await expect(authService.register(createUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should log in a user with valid credentials', async () => {
      const username = 'existinguser';
      const password = 'password';

      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash(password, 8);

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      const result = await authService.login(username, password);

      expect(result).toHaveProperty('access_token');
    });

    it('should throw UnauthorizedException when username is not found', async () => {
      const username = 'nonexistentuser';
      const password = 'password';

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      await expect(authService.login(username, password)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException with invalid password', async () => {
      const username = 'existinguser';
      const password = 'invalidpassword';

      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash('password', 8);

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      await expect(authService.login(username, password)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

});

