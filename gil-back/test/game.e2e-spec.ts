// game.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GameModule } from './../src/game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../src/orm.config';
import * as process from 'process';
import { Genre } from '../src/game/enums/genre-enum';
import { Platform } from '../src/game/enums/platform-enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires

describe('GameController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        GameModule,
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

  it('/game (POST) - should create a new game', () => {
    const createGameDto = {
      name: 'EAFC24',
      releaseYear: 2023,
      genres: Genre.Sport,
      platform: Platform.PlayStation_5,
    };

    return request(app.getHttpServer())
      .post('/game')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createGameDto)
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/game (GET) - should get all games', () => {
    return request(app.getHttpServer())
      .get('/game')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/game/:id (GET) - should get a game by ID', () => {
    const gameId = 2;

    return request(app.getHttpServer())
      .get(`/game/${gameId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/);
  });

  it('/game/:id (PATCH) - should update a game by ID', () => {
    const gameId = 2;
    const updateGameDto = {
      name: 'Updated Name',
      releaseYear: 2024,
      genres: Genre.Course,
      platform: Platform.PlayStation_4,
    };

    return request(app.getHttpServer())
      .patch(`/game/${gameId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateGameDto)
      .expect('Content-Type', /json/);
  });

  it('/game/:id (DELETE) - should delete a game by ID', () => {
    const gameId = 2;

    return request(app.getHttpServer())
      .delete(`/game/${gameId}`)
      .set('Authorization', `Bearer ${authToken}`)
  });

  it('/game/:id/reviews (POST) - should add a review to a game', () => {
    const gameId = 2;
    const createReviewDto = {
      title: 'Great Game',
      content: 'This game is awesome!',
      rating: 5,
      pros: 'Amazing graphics',
      cons: 'None',
    };

    return request(app.getHttpServer())
      .post(`/game/${gameId}/reviews`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(createReviewDto)
      .expect('Content-Type', /json/);
  });

  afterAll(async () => {
    await app.close();
  });
});
