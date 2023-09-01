import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async findAll() {
    try {
      const todosClientes = await this.clientRepository.find();
      return todosClientes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findMany(      
    nome: string,
    dataNasciemnto: Date,
    cpf: string,
    estadoCivil: EstadoCivil
  ) {
    return `${nome}, ${dataNasciemnto}, ${cpf}, ${estadoCivil}`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
