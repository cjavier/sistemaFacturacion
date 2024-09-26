import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncomeDocument = Income & Document;

@Schema()
export class Income {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  category: string[];

  @Prop({ required: true })
  rfcReceiver: string;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  isPaid: boolean;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })  
  user: string;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);