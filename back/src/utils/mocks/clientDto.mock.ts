import { CreateClientDto } from '../../client/dto/create-client.dto';
import { EstadoCivil } from '../../client/enums/estadocivil.enum';

const mockClienteDto: CreateClientDto = {
  nome: 'Valdecir',
  dataNascimento: '1990-01-01',
  cpf: '81587325004',
  estadoCivil: EstadoCivil.CASADO,
};

export default mockClienteDto;
