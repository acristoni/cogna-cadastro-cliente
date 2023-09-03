import { ValidacaoEstadoCivil } from './estadoCivil.validacao';

describe('Validação estado civil', () => {
  const validacaoEstadoCivil = new ValidacaoEstadoCivil();
  it('Verifica se o estado civil é válido, dentro da lista: casado, solteiro, divorciado, viuvo', () => {
    expect(validacaoEstadoCivil.validar('casado')).toBeTruthy();
    expect(validacaoEstadoCivil.validar('solteiro')).toBeTruthy();
    expect(validacaoEstadoCivil.validar('divorciado')).toBeTruthy();
    expect(validacaoEstadoCivil.validar('viuvo')).toBeTruthy();
  });
  it('Verifica se o estado civil é Inválido, passando qualquer outro valor fora da lista', () => {
    expect(validacaoEstadoCivil.validar('uniao')).toBeFalsy();
  });
});
