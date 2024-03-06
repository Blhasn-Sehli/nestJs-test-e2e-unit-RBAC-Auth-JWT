import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  const mockUser = {
    "_id": "65e641d3dd9bbf13fa6b294d",
    "email": "admin@gmail.com",
    "password": "$2b$10$R.SxzfTjNWQ2QZhlXv.uiOLzVGjgrRDFKZTu15T4D3UGSeaWwGJy.",
    "name": "Admin",
    "role": "admin",
    "__v": 0
  }
  let service: UserService;
  let model: Model<User>;

  //Mocking the UserService Same Name as the 
  //Original Written in the Mongoose fucntion Names

  let MockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {

        provide: getModelToken(User.name),
        useValue: MockUserService,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));

  });




  //findOne
  it('should return a user', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);
    expect(await service.findOne(mockUser.name)).toEqual(mockUser);
  }
  );
  //findALl
  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockResolvedValueOnce([mockUser]);
    expect(await service.findAll()).toEqual([mockUser]);
  }
  );
  //update
  it('should return updated user', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockUser);
    expect(await service.update(mockUser._id, mockUser)).toEqual(mockUser);
  }
  );
  //remove
  it('should return deleted user', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockUser);
    expect(await service.remove(mockUser._id)).toEqual(mockUser);
  }
  );
  //create
  it('should return created user', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockUser as any);
    expect(await service.create(mockUser)).toEqual(mockUser);
  }
  );



  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
