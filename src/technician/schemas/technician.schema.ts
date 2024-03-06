import { Prop, SchemaFactory ,Schema} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TechnicianDocument = HydratedDocument<Technician>;
@Schema()
export class Technician  {
    @Prop()
    name: string;
    @Prop()
    age: number;
    @Prop()
    email: string;
}




export const TechnicianSchema = SchemaFactory.createForClass(Technician);