import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoUsuario, DiasSemana } from '@prisma/client';

export class CreateEventoDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDateString()
  horaInicio: string;

  @IsDateString()
  horaFim: string;

  @IsString()
  local: string;

  @IsEnum(DiasSemana)
  diaSemana: DiasSemana;

  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @IsOptional()
  @IsString({ each: true })
  @IsDateString({}, { each: true })
  datasCancelamento?: string[];
}