import { ClientDto } from "interfaces/clientDto.interface";
import removerCaracteresCpf from "utils/removerCaracteresCpf";

export async function createClient(
    formData: ClientDto,
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
        cpf: removerCaracteresCpf(formData.cpf)
    });

    const response = await fetch(`${process.env.URL_FRONT}/api`, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    setMensagemUsuario(responseObj.mensagemUsuario);
}