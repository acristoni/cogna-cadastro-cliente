function removerCaracteresCpf(cpf: string): string {
    const cpfSemPontuacao = cpf.replace(/[.-]/g, '');
    return cpfSemPontuacao;
  }
  
export default removerCaracteresCpf;
  