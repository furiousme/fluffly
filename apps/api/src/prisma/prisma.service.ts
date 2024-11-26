import { PrismaClient } from '../../../../node_modules/.prisma/client/index';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
       await this.$connect()
    }
}
