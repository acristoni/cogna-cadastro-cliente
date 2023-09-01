import validacaoCpf from './cpf.validacao';

describe('Validação numero de CPF', () => {
  it('CPF válido, exemplo 82533502014, apenas números', () => {
    expect(validacaoCpf('82533502014')).toBeTruthy();
  });
  it('CPF válido, exemplo 495.869.830-21, com ponto e hífen', () => {
    expect(validacaoCpf('495.869.830-21')).toBeTruthy();
  });
  it('CPF Inválido', () => {
    expect(validacaoCpf('82533502013')).toBeFalsy();
  });
});
