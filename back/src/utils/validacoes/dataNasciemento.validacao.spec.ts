import { ValidacaoDataNascimento } from './dataNascimento.validacao';

describe('Validação data de nascimento', () => {
  const validacaoDataNascimento = new ValidacaoDataNascimento();
  it('Data válida, exemplo "1990-01-01".', () => {
    expect(validacaoDataNascimento.validar('1990-01-01')).toBeTruthy();
  });
  it('Data Inválida, exemplo "01/01/1990", verifica se está em um formato válido (aaaa-mm-dd).', () => {
    expect(validacaoDataNascimento.validar('01/01/1990')).toBeFalsy();
  });
  it('Data Inválida, exemplo "1990-13-01", verifica se mês é válido.', () => {
    expect(validacaoDataNascimento.validar('1990-13-01')).toBeFalsy();
  });
  it('Data Inválida, exemplo "1990-02-31", verifica se o dia está dentro do intervalo válido para o mês.', () => {
    expect(validacaoDataNascimento.validar('1990-02-31')).toBeFalsy();
  });
  it('Data Inválida, exemplo "1850-01-01", verifica se o ano é maior do que 1900.', () => {
    expect(validacaoDataNascimento.validar('1850-01-01')).toBeFalsy();
  });
  it('Data Inválida, exemplo amanhã, verifica se data de nascimento é no futuro.', () => {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    const ano = amanha.getFullYear();
    const mes = String(amanha.getMonth() + 1).padStart(2, '0'); // O mês começa em 0
    const dia = String(amanha.getDate()).padStart(2, '0');

    const amanhaString = `${ano}-${mes}-${dia}`;

    expect(validacaoDataNascimento.validar(amanhaString)).toBeFalsy();
  });
});
