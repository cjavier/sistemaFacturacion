import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense> {
    const createdExpense = new this.expenseModel({
      ...createExpenseDto,
      user: userId,  // Asociamos el ingreso con el ID del usuario
    });
    return createdExpense.save();
  }

  // Este método ahora filtra los ingresos por userId
  async findAllByUser(userId: string): Promise<Expense[]> {
    return this.expenseModel.find({ user: userId }).exec();  // Solo ingresos del usuario autenticado
  }
}