import {
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

@Injectable()
export class ClientService {
  public constructor(
    @InjectRepository(Cliente)
    private clientRepository: Repository<Cliente>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      await this.clientRepository.insert(createClientDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{
    clients: Cliente[];
    total: number;
    currentPage: number;
    pageSize: number;
  }> {
    try {
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
    const query = this.clientRepository
      .createQueryBuilder('cliente')
      .where('cliente.nome LIKE :nome', { nome: `%${nome}%` })
      .andWhere('cliente.dataNascimento = :dataNascimento', { dataNascimento })
      .andWhere('cliente.estadoCivil = :estadoCivil', { estadoCivil })
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [clients, total] = await query.getManyAndCount();

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
    const query = this.clientRepository
      .createQueryBuilder('cliente')
      .where('cliente.cpf = :cpf', { cpf });

    const client = await query.getOne();

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await this.clientRepository
      .update(id, updateClientDto)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async remove(id: string) {
    return await this.clientRepository.delete(id).catch((error) => {
      throw new InternalServerErrorException(error);
    });
  }
}
