

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;
    const mockUser = {
        "email": "new1@gmail.com",
        "password": "456789",
        "name": "ahmed",
        "role": "manager",
    }
    //Mocking the UserService Same Name as the Original Written in the Controller
    const MockAuthService = {
        signUp: jest.fn().mockResolvedValueOnce(mockUser),
        signIn: jest.fn().mockResolvedValueOnce(mockUser),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{
                provide: AuthService,
                useValue: MockAuthService
            }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });
    //SIGN UP
    it('should return a user', async () => {
        const result = await controller.signUp(mockUser);
        expect(result).toEqual(mockUser);
    }
    );
    //SIGN IN
    it('should return a user', async () => {
        const result = await controller.signIn(mockUser);
        expect(result).toEqual(mockUser);
    }
    );
    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });


});