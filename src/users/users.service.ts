import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear un usuario nuevo usando Prisma.
   */
  create(data: CreateUserDto) {
    return this.prisma.usuario.create({ data });
  }

  /**
   * Obtener todos los usuarios registrados.
   */
  findAll() {
    return this.prisma.usuario.findMany();
  }

  /**
   * Buscar un usuario por su correo.
   * Este método es esencial para el módulo de autenticación.
   */
  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  /**
   * Obtener un usuario por su ID.
   */
  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  /**
   * Actualizar un usuario existente.
   */
  update(id: number, data: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  /**
   * Eliminar un usuario por ID.
   */
  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
