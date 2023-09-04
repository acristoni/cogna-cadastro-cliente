export default function cpfMask(value: string) {
    const numericValue = value.replace(/\D/g, '');
      
    let formattedCPF = '';
    for (let i = 0; i < numericValue.length; i++) {
        formattedCPF += numericValue.charAt(i);
        if (i === 2 || i === 5) {
            formattedCPF += '.';
        } else if (i === 8) {
            formattedCPF += '-';
        }
    }

    return formattedCPF;
}