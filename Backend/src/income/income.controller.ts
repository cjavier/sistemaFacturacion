import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Income } from './income.schema';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createIncomeDto: CreateIncomeDto): Promise<Income> {
    const userId = req.user.userId;
    console.log("controller user ID ", userId); 
    return this.incomeService.create(createIncomeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Income[]> {
    const userId = req.user.userId;  // También verifica el userId en los GETs
    return this.incomeService.findAllByUser(userId);
  }
}