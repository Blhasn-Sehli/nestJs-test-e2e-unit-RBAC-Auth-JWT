import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { Technician } from './schemas/technician.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class TechnicianService {
  constructor(@InjectModel(Technician.name) private technicianModel: Model<Technician>) { }
  //Create a new technician
  async create(createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
    try {
      const createdTechnician =  await this.technicianModel.create(createTechnicianDto);
      return createdTechnician;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //Find all technicians
  async findAll(): Promise<Technician[]> {
    try {
      const allTechnician = await this.technicianModel.find();
      return allTechnician;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //Find one technician
  async findOne(id: string): Promise<Technician> {
    try {
      const singleTechnician = await this.technicianModel.findById(id);
      return singleTechnician;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //Update a technician
  async update(id: string, updateTechnicianDto: UpdateTechnicianDto): Promise<Technician> {
    try {
      const response = await this.technicianModel.findByIdAndUpdate(id, updateTechnicianDto);
      const updatedTechnician =  await this.technicianModel.findById(id);
      return updatedTechnician;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //Remove a technician
  async remove(id: string): Promise<Technician | string> {
    try {
      const deletedTechnician = await this.technicianModel.findByIdAndDelete(id);
      return deletedTechnician;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
