import validacaoNome from './nome.validacao';

describe('Validação nome', () => {
  it('Verifica se o nome não está vazio', () => {
    expect(validacaoNome('')).toBeFalsy();
  });
  it('Nome válido, exemplo João da Silva, verifica se o nome contém apenas letras e espaços', () => {
    expect(validacaoNome('João da Silva')).toBeTruthy();
  });
  it('Nome inválido, exemplo !@#123 asdSD, verifica se o nome contém apenas letras e espaços', () => {
    expect(validacaoNome('!@#123 asdSD')).toBeFalsy();
  });
  it('Verifica se o nome não é muito curto, mínimo 2 caracteres', () => {
    expect(validacaoNome('o')).toBeFalsy();
  });
  it('Verifica se o nome não é muito longo, máximo 100 caracteres', () => {
    expect(
      validacaoNome(
        'Maria da Silva Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira Santos Oliveira Rodrigues de Souza Pereira Almeida Costa Ferreira Gomes Ribeiro Lima Abreu Pereira',
      ),
    ).toBeFalsy();
  });
});
