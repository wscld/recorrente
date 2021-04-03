import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    value: number;

    @Prop({ type: Types.ObjectId })
    companyId: Types.ObjectId;

    @Prop()
    image: string;
}

export const ProductSchama = SchemaFactory.createForClass(Product);