import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';
import { Roles } from 'src/modules/auth/roles.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN') // Apenas admins podem acessar
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN') // Apenas admins podem acessar
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.update(id, updateEventoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN') // Apenas admins podem acessar
  remove(@Param('id') id: string) {
    return this.eventoService.remove(id);
  }
}