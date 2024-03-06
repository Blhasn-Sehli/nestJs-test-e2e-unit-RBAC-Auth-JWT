import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/enums/role.enum";


export type UserDocument = HydratedDocument<User>;




@Schema()
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ minlength: 6, required: true })
  password: string;
  @Prop()
  name: string;
  @Prop({ type: String, enum: Role, default: Role.Manager })
  role: Role;

}
export const UserSchema = SchemaFactory.createForClass(User);

