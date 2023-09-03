import { ValidacaoNome } from './nome.validacao';

describe('Validação nome', () => {
  const validacaoNome = new ValidacaoNome();
  it('Verifica se o nome não está vazio', () => {
    expect(validacaoNome.validar('')).toBeFalsy();
  });
  it('Nome válido, exemplo João da Silva, verifica se o nome contém apenas letras e espaços', () => {
    expect(validacaoNome.validar('João da Silva')).toBeTruthy();
  });
  it('Nome inválido, exemplo !@#123 asdSD, verifica se o nome contém apenas letras e espaços', () => {
    expect(validacaoNome.validar('!@#123 asdSD')).toBeFalsy();
  });
  it('Verifica se o nome não é muito curto, mínimo 2 caracteres', () => {
    expect(validacaoNome.validar('o')).toBeFalsy();
  });
  it('Verifica se o nome não é muito longo, máximo 100 caracteres', () => {
    expect(
      validacaoNome.validar(
        'Maria da Silva Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira',
      ),
    ).toBeFalsy();
  });
});
