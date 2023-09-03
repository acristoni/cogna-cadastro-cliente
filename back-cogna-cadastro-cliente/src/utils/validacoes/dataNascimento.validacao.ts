export class ValidacaoDataNascimento {
  validar(dataNascimento: string): boolean {
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(dataNascimento)) {
      return false;
    }

    const [ano, mes, dia] = dataNascimento.split('-').map(Number);

    if (mes < 1 || mes > 12) {
      return false;
    }

    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia < 1 || dia > diasNoMes) {
      return false;
    }

    if (ano < 1900) {
      return false;
    }

    const data = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    if (data > hoje) {
      return false;
    }

    if (
      data.getDate() !== dia ||
      data.getMonth() !== mes - 1 ||
      data.getFullYear() !== ano
    ) {
      return false;
    }

    return true;
  }
}
