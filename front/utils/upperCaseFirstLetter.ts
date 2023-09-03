function upperCaseFirstLetter(texto: string): string {
    if (texto.length === 0) {
      return texto;
    }

    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

export default upperCaseFirstLetter;