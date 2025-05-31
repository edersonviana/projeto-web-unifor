import { JwtService } from "@nestjs/jwt";
import { jwtCosntants } from "../auth/constants";
import { PrismaService } from "src/prisma/prisma.service";

export const getUserByToken = async (token: string, prisma: PrismaService) => {

    try {
        if (!token) {
            throw new Error('Token is required');
        }
        const jwtService = new JwtService({ secret: jwtCosntants.secret });
        const payload = await jwtService.verifyAsync(token);
        const id = payload.id;
        const user = await prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                matricula: true,
                role: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
}