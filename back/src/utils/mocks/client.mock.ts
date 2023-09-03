import { EstadoCivil } from '../../client/enums/estadocivil.enum';
import { Cliente } from '../../client/entities/client.entity';

const mockClient: Cliente = {
  id: '30ebcd8e-2d1c-4946-9bcb-b5156cad08ec',
  createdAt: '2023-09-01T22:13:45.798Z',
  updatedAt: '2023-09-01T22:13:45.798Z',
  nome: 'Valdecir',
  cpf: '18199806001',
  dataNascimento: new Date('1990-01-01'),
  estadoCivil: EstadoCivil.CASADO,
};

export default mockClient;
