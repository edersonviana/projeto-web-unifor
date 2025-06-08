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
        titulo: data.titulo,
        descricao: data.descricao,
        horaInicio: new Date(data.horaInicio),
        horaFim: new Date(data.horaFim),
        local: data.local,
        diaSemana: data.diaSemana,
        tipoUsuario: data.tipoUsuario,
        datasCancelamento: data.datasCancelamento?.map(d => new Date(d)),
      },
    });
  }


  async findAll(user) {
    if (user.role === 'ADMIN') {
      return this.prisma.evento.findMany();
    } else if (user.role === 'ESTUDANTE') {
      return this.prisma.evento.findMany({
        where: {
          tipoUsuario: {
            in: [TipoUsuario.ESTUDANTE],
          },
        },
      });
    } else if (user.role === 'FUNCIONARIO') {
      return this.prisma.evento.findMany({
        where: {
          tipoUsuario: {
            in: [TipoUsuario.FUNCIONARIO],
          },
        },
      });
    }

    return new Error('Acesso não autorizado');
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

  async updateCancelamento(id: string, data: Partial<UpdateEventoDto>) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: { id },
    });
    if (!eventoExistente) {
      throw new Error(`Evento with id ${id} not found`);
    }

    let datasJaCanceladas: Date[] = eventoExistente.datasCancelamento || [];

    if (data.datasCancelamento && data.datasCancelamento.length > 0) {
      const dataParaAtualizar = data.datasCancelamento[0];
      const existe = datasJaCanceladas.some(
        d => new Date(d).getTime() === new Date(dataParaAtualizar).getTime()
      );
      if (existe) {
        // Remove a data se já existe
        datasJaCanceladas = datasJaCanceladas.filter(
          d => new Date(d).getTime() !== new Date(dataParaAtualizar).getTime()
        );
      } else {
        // Adiciona a data se não existe
        datasJaCanceladas.push(new Date(dataParaAtualizar));
      }
    }

    // Converta para string ISO antes de salvar
    data.datasCancelamento = datasJaCanceladas.map(d => d.toISOString());

    return this.prisma.evento.update({
      where: { id },
      data: {
        ...data,
        diaSemana: data.diaSemana as DiasSemana,
        tipoUsuario: data.tipoUsuario as TipoUsuario,
        datasCancelamento: data.datasCancelamento ? data.datasCancelamento : eventoExistente.datasCancelamento,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.evento.delete({ where: { id } });
  }
}