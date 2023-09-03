/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Cliente } from './entities/client.entity';
import { EstadoCivil } from './enums/estadocivil.enum';
import { mockRepositoryProvider } from '../utils/mocks/repository.mock';
import { ValidacaoCpf } from '../utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from '../utils/validacoes/dataNascimento.validacao';
import { ValidacaoEstadoCivil } from '../utils/validacoes/estadoCivil.validacao';
import { ValidacaoNome } from '../utils/validacoes/nome.validacao';
import mockListClients from '../utils/mocks/listClients.mock';
import mockReturnFind from '../utils/mocks/returnFind.mock';
import mockClient from '../utils/mocks/client.mock';
import mockClientDto from '../utils/mocks/clientDto.mock';

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: Repository<Cliente>;
  let validacaoCpf: ValidacaoCpf;
  let validacaoDataNascimento: ValidacaoDataNascimento;
  let validacaoEstadoCivil: ValidacaoEstadoCivil;
  let validacaoNome: ValidacaoNome;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        mockRepositoryProvider(Cliente),
        ValidacaoCpf,
        ValidacaoDataNascimento,
        ValidacaoEstadoCivil,
        ValidacaoNome,
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Cliente>>(
      getRepositoryToken(Cliente),
    );
    validacaoCpf = module.get<ValidacaoCpf>(ValidacaoCpf);
    validacaoDataNascimento = module.get<ValidacaoDataNascimento>(
      ValidacaoDataNascimento,
    );
    validacaoEstadoCivil =
      module.get<ValidacaoEstadoCivil>(ValidacaoEstadoCivil);
    validacaoNome = module.get<ValidacaoNome>(ValidacaoNome);
  });

  it('Deve ser definido', () => {
    expect(clientService).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar um novo cliente', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(clientRepository, 'insert').mockResolvedValue(null);
      const returnCreate = await clientService.create(mockClientDto);
      const returnMessage = 'Cliente criado com sucesso';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(clientRepository, 'insert').mockRejectedValue(null);
      await expect(clientService.create(mockClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('Não deve criar um cliente com CPF inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(false);

      await expect(clientService.create(mockClientDto)).rejects.toThrow(
        new HttpException(
          'CPF fora do padrão da Receita Federal',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('Não deve criar um cliente com data de nascimento inválida', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(false);

      await expect(clientService.create(mockClientDto)).rejects.toThrow(
        new HttpException(
          'Data de nascimento inválida',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('Não deve criar um cliente com estado civil inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(false);

      await expect(clientService.create(mockClientDto)).rejects.toThrow(
        new HttpException('Estado civil inválido', HttpStatus.BAD_REQUEST),
      );
    });
    it('Não deve criar um cliente com nome inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(false);

      await expect(clientService.create(mockClientDto)).rejects.toThrow(
        new HttpException('Nome inválido', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('Deve retornar a lista de todos os clientes paginado', async () => {
      jest
        .spyOn(clientRepository, 'findAndCount')
        .mockResolvedValue(mockListClients);
      const returnFindAll = await clientService.findAll();
      expect(returnFindAll).toStrictEqual(mockReturnFind);
    });
    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(clientRepository, 'findAndCount').mockResolvedValue(null);
      await expect(clientService.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('findMany', () => {
    it('Deve retornar a lista de clientes filtrada e páginada', async () => {
      const nome = 'Valdecir';
      const dataNascimento = '1990-01-01';
      const estadoCivil = EstadoCivil.CASADO;

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        getManyAndCount: () => mockListClients,
      };

      jest
        .spyOn(clientRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const returnFindMany = await clientService.findMany(
        nome,
        dataNascimento,
        estadoCivil,
      );
      expect(returnFindMany).toStrictEqual(mockReturnFind);
    });

    it('Deve estourar NotFoundException caso nenhum cliente atenda os critérios de busca', async () => {
      const nome = 'Valdecr';
      const dataNascimento = '1990-01-04';
      const estadoCivil = EstadoCivil.VIUVO;

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        getManyAndCount: () => [[], 0],
      };

      jest
        .spyOn(clientRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(async () => {
        await clientService.findMany(nome, dataNascimento, estadoCivil);
      }).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findByCpf', () => {
    it('Deve retornar o cliente pelo CPF', async () => {
      const cpf = '18199806001';

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        getOne: () => mockClient,
      };

      jest
        .spyOn(clientRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      const returnClient = await clientService.findByCpf(cpf);
      expect(returnClient).toStrictEqual(mockClient);
    });

    it('Deve estourar NotFoundException caso nenhum cliente possua o CPF do parâmetro', async () => {
      const cpf = '79092559008';

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        getOne: () => null,
      };

      jest
        .spyOn(clientRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(async () => {
        await clientService.findByCpf(cpf);
      }).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('Deve editar um cliente', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(clientRepository, 'update').mockResolvedValue(null);
      const returnCreate = await clientService.update('123', mockClientDto);
      const returnMessage = 'Cliente id 123 atualizado com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(clientRepository, 'update').mockRejectedValue(null);
      await expect(clientService.update('123', mockClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('Não deve editar um cliente com CPF inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(false);

      await expect(clientService.update('123', mockClientDto)).rejects.toThrow(
        new HttpException(
          'CPF fora do padrão da Receita Federal',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('Não deve editar um cliente com data de nascimento inválida', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(false);

      await expect(clientService.update('123', mockClientDto)).rejects.toThrow(
        new HttpException(
          'Data de nascimento inválida',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('Não deve editar um cliente com estado civil inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(false);

      await expect(clientService.update('123', mockClientDto)).rejects.toThrow(
        new HttpException('Estado civil inválido', HttpStatus.BAD_REQUEST),
      );
    });
    it('Não deve editar um cliente com nome inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEstadoCivil, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(false);

      await expect(clientService.update('123', mockClientDto)).rejects.toThrow(
        new HttpException('Nome inválido', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('Deve apagar um cliente pelo id', async () => {
      jest.spyOn(clientRepository, 'delete').mockResolvedValue(null);
      const returnCreate = await clientService.remove('123');
      const returnMessage = 'Cliente id 123 deletado com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(clientRepository, 'delete').mockRejectedValue(null);
      await expect(clientService.remove('123')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
