import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    const mockUser = {
        "email": "new1@gmail.com",
        "password": "456789",
        "name": "ahmed",
        "role": "manager",
    }
    let service: AuthService;
    let jwtService: JwtService;

    //Mocking the AuthService 
    const MockAuthService = {
        signUp: jest.fn().mockResolvedValueOnce(mockUser),
        signIn: jest.fn().mockResolvedValueOnce(mockUser),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtService,
                {
                    provide: AuthService,
                    useValue: MockAuthService
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);


    });



    describe('signUp', () => {
        it('should return a user', async () => {
            const result = await service.signUp(mockUser);
            expect(result).toEqual(mockUser);
        }
        );
    });
    describe('signIn', () => {
        it('should return a user', async () => {
            const result = await service.signIn(mockUser.name, mockUser.password);
            expect(result).toEqual(mockUser);
        }
        );
    });




    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});
