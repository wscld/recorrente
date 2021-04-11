import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company{
    @Prop()
    name:string;

    @Prop()
    image:string;

    @Prop()
    description:string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);