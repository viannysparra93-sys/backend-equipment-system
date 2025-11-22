import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creo un usuario nuevo usando Prisma.
   */
  create(data: CreateUserDto) {
    return this.prisma.usuario.create({ data });
  }

  /**
   * Obtengo todos los usuarios registrados.
   */
  findAll() {
    return this.prisma.usuario.findMany();
  }

  /**
   * Obtengo un usuario por su ID.
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
   * Actualizo un usuario existente.
   */
  update(id: number, data: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimino un usuario por ID.
   */
  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
