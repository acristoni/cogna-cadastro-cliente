import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Cliente } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidacaoCpf } from '../utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from '../utils/validacoes/dataNascimento.validacao';
import { ValidacaoEstadoCivil } from '../utils/validacoes/estadoCivil.validacao';
import { ValidacaoNome } from '../utils/validacoes/nome.validacao';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    ValidacaoCpf,
    ValidacaoDataNascimento,
    ValidacaoEstadoCivil,
    ValidacaoNome,
  ],
  imports: [TypeOrmModule.forFeature([Cliente])],
})
export class ClientModule {}
