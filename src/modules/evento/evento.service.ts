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

  async updateCancelamento(id: string, data: Partial<UpdateEventoDto>) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: { id },
    });
    if (!eventoExistente) {
      throw new Error(`Evento with id ${id} not found`);
    }

    let datasJaCanceladas: Date[] = eventoExistente.datasCancelamento || [];

    if (data.datasCancelamento && datasJaCanceladas.some(dataJaCancelada => data.datasCancelamento?.includes(dataJaCancelada))) {
      // Remove the dates that are already cancelled from datasJaCanceladas
      datasJaCanceladas = datasJaCanceladas.filter(dataJaCancelada => !data.datasCancelamento?.includes(dataJaCancelada));
    }

    if (data.datasCancelamento && !datasJaCanceladas.some(dataJaCancelada => data.datasCancelamento?.includes(dataJaCancelada))) {
      datasJaCanceladas.push(...data.datasCancelamento);
    }

    data.datasCancelamento = datasJaCanceladas;

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