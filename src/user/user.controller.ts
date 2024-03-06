import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing user details.
 *
 * @remarks
 * This controller is responsible for handling requests related to user details, such as creating a new user, retrieving user information, updating user details, and deleting a user.
 *
 * @param userService - The service class that handles user-related operations.
 * 
 * 
 * @returns The response from the service class.
 */

@ApiTags('User Details Report')
//Used to define the user controller in the Swagger UI

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.userService.findOne(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
