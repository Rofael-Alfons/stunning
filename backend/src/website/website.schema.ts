import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteDocument = Website & Document;

@Schema({ timestamps: true })
export class Website {
  @Prop({ required: true })
  idea: string;

  @Prop([{
    name: { type: String, required: true },
    content: { type: String, required: true }
  }])
  sections: Array<{
    name: string;
    content: string;
  }>;
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);