import validacaoEstadoCivil from './estadoCivil.validacao';

describe('Validação estado civil', () => {
  it('Verifica se o estado civil é válido, dentro da lista: casado, solteiro, divorciado, viuvo', () => {
    expect(validacaoEstadoCivil('casado')).toBeTruthy();
    expect(validacaoEstadoCivil('solteiro')).toBeTruthy();
    expect(validacaoEstadoCivil('divorciado')).toBeTruthy();
    expect(validacaoEstadoCivil('viuvo')).toBeTruthy();
  });
  it('Verifica se o estado civil é Inválido, passando qualquer outro valor fora da lista', () => {
    expect(validacaoEstadoCivil('uniao')).toBeFalsy();
  });
});
