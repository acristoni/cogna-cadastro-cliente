export class ValidacaoNome {
  validar(name: string): boolean {
    if (!name || name.trim() === '') {
      return false;
    }

    const validCharacters = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!validCharacters.test(name)) {
      return false;
    }

    // Verifique se o nome não é muito curto ou muito longo (ajuste conforme necessário)
    if (name.length < 2 || name.length > 100) {
      return false;
    }

    return true;
  }
}
