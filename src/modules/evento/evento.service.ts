import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';
import { TipoUsuario, DiasSemana } from '@prisma/client';
@Injectable()
export class EventoService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateEventoDto) {
    return await this.prisma.evento.create({
      data: {
        ...data,
        dia_semana: data.dia_semana as DiasSemana,
        tipo_usuario: data.tipo_usuario as TipoUsuario,
      },
    });
  }

  async findAll() {
    return this.prisma.evento.findMany();
  }

  async findOne(id: string) {
    return this.prisma.evento.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateEventoDto) {
    return this.prisma.evento.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.evento.delete({ where: { id } });
  }
}