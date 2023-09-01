import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Cliente } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([Cliente])],
})
export class ClientModule {}
