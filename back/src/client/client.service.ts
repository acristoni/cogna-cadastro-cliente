import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/client.entity';
import { Repository } from 'typeorm';
import { EstadoCivil } from './enums/estadocivil.enum';
import { ValidacaoCpf } from '../utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from '../utils/validacoes/dataNascimento.validacao';
import { ValidacaoEstadoCivil } from '../utils/validacoes/estadoCivil.validacao';
import { ValidacaoNome } from '../utils/validacoes/nome.validacao';

@Injectable()
export class ClientService {
  public constructor(
    @InjectRepository(Cliente)
    private clientRepository: Repository<Cliente>,
    private readonly validacaoCpf: ValidacaoCpf,
    private readonly validacaoDataNascimento: ValidacaoDataNascimento,
    private readonly validacaoEstadoCivil: ValidacaoEstadoCivil,
    private readonly validacaoNome: ValidacaoNome,
  ) {}

  async create(createClientDto: CreateClientDto) {
    if (!this.validacaoCpf.validar(createClientDto.cpf)) {
      throw new HttpException(
        'CPF fora do padrão da Receita Federal',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validacaoDataNascimento.validar(createClientDto.dataNascimento)) {
      throw new HttpException(
        'Data de nascimento inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validacaoEstadoCivil.validar(createClientDto.estadoCivil)) {
      throw new HttpException('Estado civil inválido', HttpStatus.BAD_REQUEST);
    }

    if (!this.validacaoNome.validar(createClientDto.nome)) {
      throw new HttpException('Nome inválido', HttpStatus.BAD_REQUEST);
    }

    try {
      const cliente = await this.clientRepository.insert(createClientDto);

      return {
        mensagem: 'Cliente criado com sucesso',
        id: cliente.identifiers[0].id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    page?: number,
    pageSize?: number,
  ): Promise<
    | {
        clients: Cliente[];
        total: number;
        currentPage: number;
        pageSize: number;
      }
    | Cliente[]
  > {
    try {
      if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const [clients, total] = await this.clientRepository.findAndCount({
          skip,
          take: pageSize,
        });
        return {
          clients,
          total,
          currentPage: page,
          pageSize,
        };
      } else {
        return await this.clientRepository.find();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findMany(
    nome: string,
    dataNascimento: string,
    estadoCivil: EstadoCivil,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    clients: Cliente[];
    total: number;
    currentPage: number;
    pageSize: number;
  }> {
    const [clients, total] = await this.clientRepository
      .createQueryBuilder('cliente')
      .where('cliente.nome LIKE :nome', { nome: `%${nome}%` })
      .andWhere('cliente.dataNascimento = :dataNascimento', { dataNascimento })
      .andWhere('cliente.estadoCivil = :estadoCivil', { estadoCivil })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    if (!clients || clients.length === 0) {
      throw new NotFoundException('Clientes não encontrados.');
    }

    return {
      clients,
      total,
      currentPage: page,
      pageSize,
    };
  }

  async findByCpf(cpf: string): Promise<Cliente> {
    const client = await this.clientRepository
      .createQueryBuilder('cliente')
      .where('cliente.cpf = :cpf', { cpf })
      .getOne();

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    if (
      updateClientDto.cpf &&
      !this.validacaoCpf.validar(updateClientDto.cpf)
    ) {
      throw new HttpException(
        'CPF fora do padrão da Receita Federal',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateClientDto.dataNascimento &&
      !this.validacaoDataNascimento.validar(updateClientDto.dataNascimento)
    ) {
      throw new HttpException(
        'Data de nascimento inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateClientDto.estadoCivil &&
      !this.validacaoEstadoCivil.validar(updateClientDto.estadoCivil)
    ) {
      throw new HttpException('Estado civil inválido', HttpStatus.BAD_REQUEST);
    }

    if (
      updateClientDto.nome &&
      !this.validacaoNome.validar(updateClientDto.nome)
    ) {
      throw new HttpException('Nome inválido', HttpStatus.BAD_REQUEST);
    }

    return await this.clientRepository
      .update(id, updateClientDto)
      .then(() => `Cliente id ${id} atualizado com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async remove(id: string) {
    return await this.clientRepository
      .delete(id)
      .then(() => `Cliente id ${id} deletado com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }
}
