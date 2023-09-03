function formatarCPF(cpf: string): string {
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return cpf;
};

export default formatarCPF;
  