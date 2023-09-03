import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import mockClienteDto from '../utils/mocks/clientDto.mock';
import { mockRepositoryProvider } from '../utils/mocks/repository.mock';
import { Cliente } from './entities/client.entity';
import { ValidacaoCpf } from '../utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from '../utils/validacoes/dataNascimento.validacao';
import { ValidacaoEstadoCivil } from '../utils/validacoes/estadoCivil.validacao';
import { ValidacaoNome } from '../utils/validacoes/nome.validacao';
import mockReturnFind from '../utils/mocks/returnFind.mock';
import { EstadoCivil } from './enums/estadocivil.enum';
import mockClient from '../utils/mocks/client.mock';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService,
        mockRepositoryProvider(Cliente),
        ValidacaoCpf,
        ValidacaoDataNascimento,
        ValidacaoEstadoCivil,
        ValidacaoNome,
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  describe('create', () => {
    it('Deve criar um novo cliente', async () => {
      const expectedResult = 'Cliente criado com sucesso';
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(mockClienteDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('findAll', () => {
    it('Deve retornar a lista de todos os clientes paginada', async () => {
      const page = 1;
      const pageSize = 10;
      jest.spyOn(service, 'findAll').mockResolvedValue(mockReturnFind);

      const result = await controller.findAll(page, pageSize);
      expect(result).toBe(mockReturnFind);
    });
  });

  describe('findMany', () => {
    const nome = 'Valdecir';
    const dataNascimento = '1990-01-01';
    const estadoCivil = EstadoCivil.SOLTEIRO;
    const page = 1;
    const pageSize = 10;
    it('Deve filtrar e paginar os clientes por nome, estado civil e data de nascimento, SE NÃO FOR ENVIADO O CPF', async () => {
      jest.spyOn(service, 'findMany').mockResolvedValue(mockReturnFind);

      const result = await controller.findMany(
        nome,
        dataNascimento,
        null,
        estadoCivil,
        page,
        pageSize,
      );
      expect(result).toBe(mockReturnFind);
    });

    it('Deve retornar um único cliente, caso haja a quary CPF', async () => {
      const cpf = '49317131069';
      jest.spyOn(service, 'findByCpf').mockResolvedValue(mockClient);

      const result = await controller.findMany(
        null,
        null,
        cpf,
        null,
        null,
        null,
      );
      expect(result).toBe(mockClient);
    });
  });

  describe('update', () => {
    it('Deve atualizar um cliente', async () => {
      const id = '1';
      const expectedResult = 'Cliente atualizado com sucesso';
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(id, mockClienteDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('remove', () => {
    it('Deve deletar um cliente', async () => {
      const id = '1';
      const expectedResult = 'Cliente removido com sucesso';
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(id);
      expect(result).toBe(expectedResult);
    });
  });
});
