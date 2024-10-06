import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })  // Enable automatic createdAt and updatedAt fields
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  userId: string;  // Store the user ID of the content creator

  @Prop({ required: true })
  username: string;  // Store the username of the content creator

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
