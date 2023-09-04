import { EstadoCivil } from "enums/estadocivil.enum";

export interface ClientDto {
    nome: string,
    dataNascimento: string,
    cpf: string,
    estadoCivil: EstadoCivil,
}