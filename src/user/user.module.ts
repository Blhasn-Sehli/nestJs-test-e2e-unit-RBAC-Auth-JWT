import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  //Add the MongooseModule.forFeature() method to the imports array of the UserModule.
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])] ,
  controllers: [UserController],
  providers: [UserService],
  //Export the UserService so that it can be used in other modules.
  exports: [UserService]
})
export class UserModule {}
