import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './expense.schema';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const userId = req.user.userId;
    console.log("controller user ID ", userId); 
    return this.expenseService.create(createExpenseDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()

  async findAll(@Request() req): Promise<Expense[]> {
    const userId = req.user.userId;  // También verifica el userId en los GETs
    return this.expenseService.findAllByUser(userId);
  }
}