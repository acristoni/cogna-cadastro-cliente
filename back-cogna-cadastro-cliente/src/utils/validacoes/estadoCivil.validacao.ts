export default function validacaoEstadoCivil(estadoCivil: string): boolean {
  if (
    estadoCivil === 'casado' ||
    estadoCivil === 'solteiro' ||
    estadoCivil === 'divorciado' ||
    estadoCivil === 'viuvo'
  ) {
    return true;
  } else {
    return false;
  }
}
