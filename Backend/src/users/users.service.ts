import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Crear un nuevo usuario con nombre, apellido, email, contraseña, y términos aceptados
  async createUser(firstname: string, lastname: string, email: string, password: string, acceptedTerms: boolean): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);  // Encriptar la contraseña
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      acceptedTerms,
    });
    return newUser.save();  // Guardar en la base de datos
  }

  // Buscar un usuario por email
  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
}