import { EstadoCivil } from "enums/estadocivil.enum";
import { ClientDto } from "interfaces/clientDto.interface";

export default function handleEditButton(params: any, setEditClient: (editClient: { clientDto: ClientDto, idClient: string }) => void) {
    let estadoCivilEdit: EstadoCivil;

    switch (params.row.estadoCivil) {
        case 'Solteiro':
        estadoCivilEdit = EstadoCivil.SOLTEIRO;
        break;
        case 'Divorciado':
        estadoCivilEdit = EstadoCivil.DIVORCIADO;
        break;
        case 'Viuvo':
        estadoCivilEdit = EstadoCivil.VIUVO;
        break;
        case 'Casado':
        estadoCivilEdit = EstadoCivil.CASADO;
        break;
        default:
        estadoCivilEdit = EstadoCivil.SOLTEIRO;
        break;
    }
    const clientDto: ClientDto = {
        nome: params.row.nome,
        dataNascimento: params.row.dataNascimento,
        cpf: params.row.cpf,
        estadoCivil: estadoCivilEdit,
    }

    setEditClient({
        clientDto,
        idClient: params.row.id
    })
}