import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    value: number;

    @Prop()
    companyId: number;

    @Prop()
    image: string;
}

export const ProductSchama = SchemaFactory.createForClass(Product);