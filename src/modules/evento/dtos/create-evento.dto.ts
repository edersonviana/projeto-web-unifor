import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoUsuario, DiasSemana } from '@prisma/client';

export class CreateEventoDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDateString()
  hora_inicio: string;

  @IsDateString()
  hora_fim: string;

  @IsString()
  local: string;

  @IsEnum(DiasSemana)
  dia_semana: DiasSemana;

  @IsEnum(TipoUsuario)
  tipo_usuario: TipoUsuario;
}