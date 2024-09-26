import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  category: string[];

  @Prop({ required: true })
  rfcSender: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })  
  user: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);