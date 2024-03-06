import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

/**
 * The UserService class provides methods for creating, retrieving, updating, and deleting users.
 * It interacts with the User model to perform these operations.
 *
 * @remarks
 * This class is responsible for handling user-related operations, such as creating a new user, retrieving user information, updating user details, and deleting a user.
 * @class
 * @name UserService
 */

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  //Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser =  await this.userModel.create(createUserDto);
    return createdUser;
  }
  //Find all users
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
  //Find one user
  async findOne(name: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ name: name });
      return user;
    }
    catch (error) {
      throw new BadRequestException(`Enter a Valid name Please This name  = ${name} is not valid`);
      // Two ways to throw an exception

      // throw new HttpException({
      //   status: HttpStatus.NOT_FOUND,
      //   error: `Enter a Valid Id Please This id  = ${id} is not valid`,
      // }, HttpStatus.NOT_FOUND, {
      //   cause: error
      // });
    }


  }
  //Update a user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(`Enter a Valid Id Please This id  = ${id} is not valid`);
    }
  }
  //Remove a user
  async remove(id: string): Promise<User | string> {
    try {

      const deletedUser = await this.userModel.findByIdAndDelete(id);
      return deletedUser || `No  User Found with this id = ${id} To Delete`;
    } catch (error) {
      throw new BadRequestException(`Enter a Valid Id Please This id  = ${id} is not valid`);

    }
  }
}
