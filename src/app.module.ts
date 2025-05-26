import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { EventoModule } from './modules/evento/evento.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, EventoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
