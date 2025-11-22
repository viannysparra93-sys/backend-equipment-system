import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Validar email + password
  async validateUser(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passOk = await bcrypt.compare(password, user.password);

    if (!passOk) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return user;
  }

  // Login
  async login(data: { email: string; password: string }) {
    const user = await this.validateUser(data.email, data.password);

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };

    return {
      message: 'Inicio de sesión exitoso',
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  // Registro
  async register(data: { nombre: string; apellido: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashed,
        rol: 'user',
      },
    });

    return {
      message: 'Usuario registrado correctamente',
      user,
    };
  }
}
