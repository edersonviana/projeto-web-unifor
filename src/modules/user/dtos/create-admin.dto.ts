import { IsDateString, IsEmail, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdminDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  senha: string;

  @IsOptional()
  cpf: string;

}
