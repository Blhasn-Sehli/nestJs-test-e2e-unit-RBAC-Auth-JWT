import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TechnicianModule } from './technician/technician.module';

@Module({
  //The forRoot() method accepts the same configuration object as mongoose.connect() from the Mongoose package, as described here.
  //Model injection
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UserModule, AuthModule, TechnicianModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
