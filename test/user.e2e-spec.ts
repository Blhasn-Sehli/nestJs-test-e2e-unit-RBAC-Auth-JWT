// user.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


/**
 * This code snippet is an end-to-end test scenario for the User module in a NestJS application.
 * It uses the `supertest` library to send HTTP requests to the application and asserts the responses.
 * The scenario includes the following steps:
 * 1. Create a user by sending a POST request to the '/auth/register' endpoint.
 * 2. Get a list of users by sending a GET request to the '/user' endpoint.
 * 3. Get a specific user by name by sending a GET request to the '/user/{name}' endpoint.
 * 4. Update a user by sending a PUT request to the '/user/{id}' endpoint.
 * 5. Delete a user by sending a DELETE request to the '/user/{id}' endpoint.
 * 
 * The scenario assumes that the user with the name 'testuser' exists and has an ID.
 * The user ID is stored in the `UserId` variable for later use in the scenario.
 * 
 * The scenario is wrapped in a `describe` block and each step is defined as an individual test case using the `it` function.
 * The `beforeAll` function is used to set up the testing environment by creating a NestJS application instance.
 * The `afterAll` function is used to clean up the testing environment by closing the application instance.
 * 
 * To run this test scenario, execute the `describe` block using a testing framework like Jest or Mocha.
 */

describe('User Senario', () => {
    let app: INestApplication;
    let UserId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });


    // It Must be run after the user is created So that we can get the user ID With the auth register Function
    it('should create a user', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
                "email": "testuser@gmail.com",
                "password": "456789",
                "name": "testuser",
                "role": "manager"
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty('name', 'testuser');
                UserId = response.body._id;
            });
    });


    it('should get a list of users', () => {
        return request(app.getHttpServer())
            .get('/user')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
            });
    });

    it('should get a specific user by Name', () => {
        return request(app.getHttpServer())
            .get('/user/testuser') // Assuming user name testuser exists
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty('name', 'testuser');
            });
    });

    it('should update a user', () => {
        return request(app.getHttpServer())
            .put(`/user/${UserId}`) // Assuming user ID 1 exists
            .send({
                name: 'testuserUpdated',
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', UserId);
                expect(response.body.name).toEqual('testuserUpdated');
            });
    });

    it('should delete a user', () => {
        return request(app.getHttpServer())
            .delete(`/user/${UserId}`) // Assuming user ID 1 exists
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
