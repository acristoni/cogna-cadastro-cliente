import { ApiProperty } from '@nestjs/swagger';
import { EstadoCivil } from '../enums/estadocivil.enum';

export class UpdateClientDto {
    @ApiProperty({
        description: 'Nome do cliente',
        example: 'Valdecir',
        required: false
    })
    nome?: string;

    @ApiProperty({
        description: 'Data de nascimento do cliente',
        example: '1990-01-01',
        required: false,
    })
    dataNascimento?: string;

    @ApiProperty({
        description: 'CPF do cliente',
        example: '49317131069',
        required: false
    })
    cpf?: string;

    @ApiProperty({
        type: 'enum',
        enum: EstadoCivil,
        default: EstadoCivil.SOLTEIRO,
        example: EstadoCivil.SOLTEIRO,
        description: 'Estado civil do usuário',
        required: false
    })
    estadoCivil?: EstadoCivil;
}
