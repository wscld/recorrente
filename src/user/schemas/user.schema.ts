import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    refreshToken: string;

    @Prop({ type: Types.Array })
    productIds: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);