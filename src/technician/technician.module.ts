import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Technician, TechnicianSchema } from './schemas/technician.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Technician.name, schema: TechnicianSchema }])],
  controllers: [TechnicianController],
  providers: [TechnicianService],
})
export class TechnicianModule { }
