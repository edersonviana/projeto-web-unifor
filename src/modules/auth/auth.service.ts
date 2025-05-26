import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dtos/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtService: JwtService){}


    async signin(data: SignInDTO){
        const user =  await this.prismaService.usuario.findUnique({
            where: {
                matricula: data.matricula,
            },
        });     
        if(!user){
            throw new UnauthorizedException("Credenciais inválidas!");
        }
        const passowrdMatch = await bcrypt.compare(data.senha, user.senha);
        if(!passowrdMatch){
            throw new UnauthorizedException("Credenciais inválidas");
        }
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            nome: user.nome,
            role: user.role,
        });
        return {
            accessToken,
        };
    }

}
