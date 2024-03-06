import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { describe } from 'node:test';




describe('Technician Senario', () => {
    //set the token to the admin token then it will be removed just use it for testing
    const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4iLCJzdWIiOiI2NWU2NDFkM2RkOWJiZjEzZmE2YjI5NGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MjA1ODYsImV4cCI6MTcwOTgwNjk4Nn0.5ArJo1voyBxOi15av3WolRkH3gfNGS8SMH-CseHqxz4'
    const MANGER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFuYWdlciIsInN1YiI6IjY1ZTY0MjZjZjliZjMzZjhlYzE0OTlmNSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzA5NzIwNjk0LCJleHAiOjE3MDk4MDcwOTR9.83p9JeYUB_vYXtN3FimBLu88x-t6JUCWQGNdbCnRftg'
    interface fakeTechnician {
        email: string;
        name: string;
        age: number;
        _id: string;
        __v: number;
    }
    let app: INestApplication;
    let fakeTechnician: fakeTechnician;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    //create a technician
    describe('Create a Technician cases ', () => {

        it('should Create a Technician For Admin ', () => {
            return request(app.getHttpServer())

                //set the header to  the authorization token
                .post('/technician/')
                .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
                .send({
                    "email": "fakeTechnicin@gmail.com",
                    "name": "fakeTechnician",
                    "age": 25,
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .then((response) => {
                    fakeTechnician = response.body;
                    expect(response.body).toHaveProperty('name', 'fakeTechnician');
                });
        });
        it('should forbidden the action for manager ', () => {
            return request(app.getHttpServer())
                //set the header to  the authorization token
                .post('/technician/')
                .set('Authorization', `Bearer ${MANGER_TOKEN}`)
                .send({
                    "email": "fakeTechnicin@gmail.com",
                    "name": "fakeTechnician",
                    "age": 25,
                })
                .expect(403)

        }
        );
    });

    // get all technicians
    describe('Get all Technicians cases ', () => {
        it('should Get all Technicians For Admin ', () => {
            return request(app.getHttpServer())
                .get('/technician/')
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toBeInstanceOf(Array);
                });
        });

        it('should Get all Technicians For Manager ', () => {
            return request(app.getHttpServer())
                .get('/technician/')
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${MANGER_TOKEN}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toBeInstanceOf(Array);
                });
        });
    });

    //get a technician by id
    describe('Get a Technician cases ', () => {
        it('should Get a Technician For Admin ', () => {
            return request(app.getHttpServer())
                .get(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toHaveProperty('name', 'fakeTechnician');
                });
        });

        it('should Get a Technician For Manager ', () => {
            return request(app.getHttpServer())
                .get(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${MANGER_TOKEN}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toHaveProperty('name', 'fakeTechnician');
                });
        });
    });

    //update a technician
    describe('Update a Technician cases ', () => {
        it('should Update a Technician For Admin ', () => {
            return request(app.getHttpServer())
                .put(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
                .send({
                    "age": 22,
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toHaveProperty('age', 22);
                });
        }
        );

        it('should forbidden the action for manager ', () => {
            return request(app.getHttpServer())
                .put(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${MANGER_TOKEN}`)
                .send({
                    "age": 50,
                })
                .expect(403)
        }
        );
    }
    );


    //delete a technician
    describe('Delete a Technician cases ', () => {
        it('should Delete a Technician For Admin ', () => {
            return request(app.getHttpServer())
                .delete(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response) => {
                    expect(response.body).toHaveProperty('name', 'fakeTechnician');
                });
        }
        );

        it('should forbidden the action for manager ', () => {
            return request(app.getHttpServer())
                .delete(`/technician/${fakeTechnician._id}`)
                //set the header to  the authorization token
                .set('Authorization', `Bearer ${MANGER_TOKEN}`)
                .expect(403)
        }
        );
    }
    );





});
