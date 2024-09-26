import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income, IncomeDocument } from './income.schema';
import { CreateIncomeDto } from './dto/create-income.dto';

@Injectable()
export class IncomeService {
  constructor(@InjectModel(Income.name) private incomeModel: Model<IncomeDocument>) {}

  async create(createIncomeDto: CreateIncomeDto, userId: string): Promise<Income> {
    const createdIncome = new this.incomeModel({
      ...createIncomeDto,
      user: userId,  // Asociamos el ingreso con el ID del usuario
    });
    return createdIncome.save();
  }

  // Este método ahora filtra los ingresos por userId
  async findAllByUser(userId: string): Promise<Income[]> {
    return this.incomeModel.find({ user: userId }).exec();  // Solo ingresos del usuario autenticado
  }
}