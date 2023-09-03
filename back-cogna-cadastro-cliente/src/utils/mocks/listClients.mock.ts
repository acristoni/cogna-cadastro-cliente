import { EstadoCivil } from '../../client/enums/estadocivil.enum';
import { Cliente } from '../../client/entities/client.entity';

const mockListClients: [Cliente[], number] = [
  [
    {
      id: '30ebcd8e-2d1c-4946-9bcb-b5156cad08ec',
      createdAt: '2023-09-01T22:13:45.798Z',
      updatedAt: '2023-09-01T22:13:45.798Z',
      nome: 'Valdecir',
      cpf: '49317131061',
      dataNascimento: new Date('1990-01-01'),
      estadoCivil: EstadoCivil.CASADO,
    },
    {
      id: 'f9876f97-5a09-4167-ab65-726e79e8f389',
      createdAt: '2023-09-01T22:13:51.805Z',
      updatedAt: '2023-09-01T22:13:51.805Z',
      nome: 'Valdecir',
      cpf: '49317131062',
      dataNascimento: new Date('1990-01-01'),
      estadoCivil: EstadoCivil.CASADO,
    },
  ],
  2,
];

export default mockListClients;
