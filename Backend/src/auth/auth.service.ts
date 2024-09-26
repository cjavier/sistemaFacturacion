import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { password, ...result } = user.toObject();  // Convertimos a un objeto plano
    console.log(result);
    return { ...result, _id: user._id.toString() };  // Retornamos el _id como cadena
  }

  async login(user: any) {
    console.log(user); // Verifica que user tiene el email y otros datos
    const payload = { email: user.email, sub: user._id.toString() };  // Ahora user.email debería funcionar
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}