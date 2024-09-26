import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(
    @Body() body: { firstname: string, lastname: string, email: string, password: string, acceptedTerms: boolean },
  ) {
    const { firstname, lastname, email, password, acceptedTerms } = body;
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions');
    }
    return this.usersService.createUser(firstname, lastname, email, password, acceptedTerms);
  }
}