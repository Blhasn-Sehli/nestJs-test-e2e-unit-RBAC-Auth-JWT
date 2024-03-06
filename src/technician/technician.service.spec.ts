import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianService } from './technician.service';
import { getModelToken } from '@nestjs/mongoose';
import { Technician } from './schemas/technician.schema';
import { Model } from 'mongoose';


describe('TechnicianService', () => {
    let service: TechnicianService;
    let model: Model<Technician>;
    const mockTechnician = {
        "_id": "65e63462a68f50741a9256f0",
        "name": "Admin",
        "email": "admin@gmail.com",
        "__v": 0
    }


    const MockTechnicianService = {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TechnicianService,
                {
                    provide: getModelToken(Technician.name),
                    useValue: MockTechnicianService,

                }],
        }).compile();

        service = module.get<TechnicianService>(TechnicianService);
        model = module.get<Model<Technician>>(getModelToken(Technician.name));
    });
    //create    
    it('should be able to create a new technician', async () => {
        jest.spyOn(model, 'create').mockResolvedValueOnce(mockTechnician as any);
        expect(await service.create(mockTechnician as any)).toEqual(mockTechnician);
    });
    //findAll
    it('should return all technicians', async () => {
        jest.spyOn(model, 'find').mockResolvedValueOnce([mockTechnician] as any);
        expect(await service.findAll()).toEqual([mockTechnician]);
    });
    //findOne
    it('should return a technician', async () => {
        jest.spyOn(model, 'findById').mockResolvedValueOnce(mockTechnician as any);
        expect(await service.findOne(mockTechnician._id)).toEqual(mockTechnician);
    });
    //update
    it('should return updated technician', async () => {
        jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockTechnician as any);
        expect(await service.update(mockTechnician._id, mockTechnician as any)).toEqual(mockTechnician);
    });
    //remove
    it('should return deleted technician', async () => {
        jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockTechnician as any);
        expect(await service.remove(mockTechnician._id)).toEqual(mockTechnician);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});