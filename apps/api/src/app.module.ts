import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, UserService],
})
export class AppModule {}
