import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../src/orm.config';
import * as process from 'process';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...config,
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'usertest', password: process.env.E2E_PASSWORD });

    authToken = loginResponse.body.access_token;
  });

  it('/users (POST) - should create a new user', () => {
    const createUserDto = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'newpassword',
      player_type: 'Novice',
      favorite_mode: 'Solo',
    };

    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createUserDto)
      .expect('Content-Type', /json/);
  });

  it('/users (GET) - should get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/users/:id (GET) - should get a user by ID', () => {
    const userId = '3';

    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/users/:id (PATCH) - should update a user by ID', () => {
    const userId = '6';

    const updateUserDto = {
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'updatedpassword',
      player_type: 'Novice',
      favorite_mode: 'Solo',
    };

    return request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateUserDto)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/users/:id (DELETE) - should delete a user by ID', () => {
    const userId = '6';

    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
