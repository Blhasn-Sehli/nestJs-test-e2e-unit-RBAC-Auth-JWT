

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';


describe('UserController', () => {
    let controller: UserController;
    let service: UserService;
    const mockUser = {
        "_id": "65e641d3dd9bbf13fa6b294d",
        "email": "admin@gmail.com",
        "password": "$2b$10$R.SxzfTjNWQ2QZhlXv.uiOLzVGjgrRDFKZTu15T4D3UGSeaWwGJy.",
        "name": "Admin",
        "role": "admin",
        "__v": 0
    }
    //Mocking the UserService Same Name as the Original Written in the Controller
    const MockUserService = {
        findOne: jest.fn().mockResolvedValueOnce(mockUser),
        update: jest.fn().mockResolvedValueOnce(mockUser),
        remove: jest.fn().mockResolvedValueOnce(mockUser),
        findAll: jest.fn().mockResolvedValueOnce([mockUser]),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: MockUserService
            }],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });
    //Find all users
    it('should return all users', async () => {
        expect(await controller.findAll()).toEqual([mockUser]);
    }
    );
    // Find one user
    it('should return a user', async () => {
        expect(await controller.findOne(mockUser.name)).toEqual(mockUser);
    }
    );
    // Update a user
    it('should return updated user', async () => {
        expect(await controller.update(mockUser._id, mockUser)).toEqual(mockUser);
    }
    );
    //Remove a user
    it('should return deleted user', async () => {
        expect(await controller.remove(mockUser._id)).toEqual(mockUser);
    }
    );


    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });


});