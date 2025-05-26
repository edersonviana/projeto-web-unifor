// src/user/user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDTO } from './dtos/create-admin.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
  async createAdmin(dto: CreateAdminDTO) {
    const userAlreadyExists = await this.prisma.usuario.findUnique({
      where: { matricula: dto.matricula },
    });

    if (userAlreadyExists) {
      throw new ConflictException('Esta Matrícula já existe.');
    }

    const hashedPassword = await bcrypt.hash(dto.senha, 10);

    const admin = await this.prisma.usuario.create({
      data: {
        ...dto,
        senha: hashedPassword,
        role: 'ADMIN',
      },
    });

    return {
      id: admin.id,
      matricula: admin.matricula,
      role: admin.role,
    };
  }
}
