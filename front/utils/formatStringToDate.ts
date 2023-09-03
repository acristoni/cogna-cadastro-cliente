function formatStringToDate(dataStr: string): Date | null {
    const partes = dataStr.split('-');
    if (partes.length === 3) {
      const ano = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const dia = parseInt(partes[2], 10);
      
      if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia)) {
        return new Date(ano, mes, dia);
      }
    }
    
    return null;
  }

export default formatStringToDate;