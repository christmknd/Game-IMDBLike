import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ReviewModule } from './../src/review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../src/orm.config';
import * as process from 'process';
import { Role } from "../src/users/enums/role.enum";

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ReviewModule,
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
      .send({ username: 'usertest', password: process.env.E2E_PASSWORD, roles: Role.Admin });

    authToken = loginResponse.body.access_token;
  });

  it('/review (POST) - should create a new review', () => {
    const createReviewDto = {
      title: 'Great Game',
      content: 'This game is awesome!',
      rating: 5,
      pros: 'Amazing graphics',
      cons: 'None',
    };

    return request(app.getHttpServer())
      .post('/review')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createReviewDto)
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/review (GET) - should get all reviews', () => {
    return request(app.getHttpServer())
      .get('/review')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/);
  });

  it('/review/:id (GET) - should get a review by ID', () => {
    const reviewId = 2;

    return request(app.getHttpServer())
      .get(`/review/${reviewId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/);
  });

  it('/review/:id (PATCH) - should update a review by ID', () => {
    const reviewId = 2;
    const updateReviewDto = {
      title: 'Updated Title',
      content: 'Updated content',
      rating: 4,
      pros: 'Updated pros',
      cons: 'Updated cons',
    };

    return request(app.getHttpServer())
      .patch(`/review/${reviewId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateReviewDto)
      .expect('Content-Type', /json/);
  });

  it('/review/:id (DELETE) - should delete a review by ID', () => {
    const reviewId = 2;

    return request(app.getHttpServer())
      .delete(`/review/${reviewId}`)
      .set('Authorization', `Bearer ${authToken}`)
  });

  afterAll(async () => {
    await app.close();
  });
});
