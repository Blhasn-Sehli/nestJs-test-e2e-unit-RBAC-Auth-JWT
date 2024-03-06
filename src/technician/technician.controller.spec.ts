//Give me the boiler plate for this controller test 
import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianController } from './technician.controller';
import { TechnicianService } from './technician.service';
import { Technician } from './schemas/technician.schema';
import { JwtService } from '@nestjs/jwt';

describe('TechnicianController', () => {
    let controller: TechnicianController;
    let service: TechnicianService;
    const mockTechnician = {
        "_id": "65e63462a68f50741a9256f0",
        "name": "Admin",
        "email": "admin@gmail.com",
        "__v": 0
    }
    //boiler plate
    const MockTechnicianService = {
        create: jest.fn().mockResolvedValueOnce(mockTechnician),
        findOne: jest.fn().mockResolvedValueOnce(mockTechnician),
        findAll: jest.fn().mockResolvedValueOnce([mockTechnician]),
        update: jest.fn().mockResolvedValueOnce(mockTechnician),
        remove: jest.fn().mockResolvedValueOnce(mockTechnician),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TechnicianController],
            providers: [
                JwtService
                , {
                    provide: TechnicianService,
                    useValue: MockTechnicianService
                }],
        }).compile();

        controller = module.get<TechnicianController>(TechnicianController);
        service = module.get<TechnicianService>(TechnicianService);
    });
    //create
    it('should be able to create a new technician', async () => {
        expect(await controller.create(mockTechnician as any)).toEqual(mockTechnician);
    });
    //findAll
    it('should return all technicians', async () => {
        expect(await controller.findAll()).toEqual([mockTechnician]);
    });
    //findOne
    it('should return a technician', async () => {
        expect(await controller.findOne(mockTechnician._id)).toEqual(mockTechnician);
    });
    //update
    it('should return updated technician', async () => {
        expect(await controller.update(mockTechnician._id, mockTechnician as any)).toEqual(mockTechnician);
    });
    //remove
    it('should return deleted technician', async () => {
        expect(await controller.remove(mockTechnician._id)).toEqual(mockTechnician);
    });


    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


});