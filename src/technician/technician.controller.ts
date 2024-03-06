import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { Roles } from 'src/decorators/role.decorater';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';



/**
 * Controller for managing technician details.
 * @remarks
 * TechnicianController class handles the routes related to technician operations.
 * It is responsible for creating, retrieving, updating, and deleting technician records.
 * The routes are guarded with the AuthGuard and RolesGuard to ensure only authorized users can access them.
 * The routes are also decorated with the @ApiTags decorator to define the technician controller in the Swagger UI.
  *
  * @param technicianService - The service class that handles technician-related operations.
  * 
  *   
  * @returns The response from the service class.
*/

//Guarding the routes with AuthGuard and RolesGuard
@ApiTags('Technician Details Report')
//Used to define the technician controller in the Swagger UI

@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) { }
  @Post()
  //his decorator allows specifying what roles are required to access specific resources.
  @Roles(Role.ADMIN)
  //Guarding the routes with AuthGuard and RolesGuard
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.technicianService.create(createTechnicianDto);
  }
  @Get()
  findAll() {
    return this.technicianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicianService.findOne(id);
  }

  @Put(':id')
  //his decorator allows specifying what roles are required to access specific resources.
  @Roles(Role.ADMIN)
  //Guarding the routes with AuthGuard and RolesGuard
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateTechnicianDto: UpdateTechnicianDto) {
    return this.technicianService.update(id, updateTechnicianDto);
  }

  @Delete(':id')
  //his decorator allows specifying what roles are required to access specific resources.
  @Roles(Role.ADMIN)
  //Guarding the routes with AuthGuard and RolesGuard
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.technicianService.remove(id);
  }
}
