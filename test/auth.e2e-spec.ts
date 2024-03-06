import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

/**
 * This code snippet is a test suite for the authentication scenario in a NestJS application.
 * It includes tests for user registration, user login, and user deletion.
 * 
 * The test suite uses the `@nestjs/testing` module to create a testing module and initialize the Nest application.
 * It also imports the `AppModule` from the application source code.
 * 
 * The `fakeAdmin` interface is defined to represent the structure of a fake admin user.
 * 
 * The `beforeAll` hook is used to initialize the Nest application before running the tests.
 * 
 * The first test, `should register a user`, sends a POST request to the `/auth/register` endpoint with fake user data.
 * It expects a 201 status code and a JSON response with the registered user's details.
 * 
 * The second test, `should login a user`, sends a POST request to the `/auth/login` endpoint with fake user data.
 * It expects a 201 status code and a JSON response with an access token.
 * 
 * The third test, `should delete a user`, sends a DELETE request to the `/user/{userId}` endpoint with the ID of the fake user.
 * It expects a 200 status code and a JSON response matching the deleted user's details.
 * 
 * This test suite can be used to verify the functionality of the authentication endpoints in the NestJS application.
 */


describe('Auth Senario', () => {
    interface fakeAdmin {
        email: string;
        password: string;
        name: string;
        role: string;
        _id: string;
        __v: number;
    }
    let app: INestApplication;
    let fakeAdmin : fakeAdmin;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    //register
    it('should register a user', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
                "email": "fakeAdmin@gmail.com",
                "password": "123456",
                "name": "fakeAdmin",
                "role": "admin"
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .then((response) => {
                fakeAdmin = response.body;
                expect(response.body).toHaveProperty('name', 'fakeAdmin');
            });



    });


    //login
    it('should login a user', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                "email": "fakeAdmin@gmail.com",
                "password": "123456",
                "name": "fakeAdmin",
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty('access_token');
            });
    }
    );
    
    //delete that user so that the test can be run again && to avoid the duplication of the user in the database
    it('should delete a user', () => {
        return request(app.getHttpServer())
            .delete(`/user/${fakeAdmin._id}`)
            .send({
                "email": "",
                "password": "123456",
                "name": "fakeAdmin",
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(fakeAdmin);
            });
    }
    );

});