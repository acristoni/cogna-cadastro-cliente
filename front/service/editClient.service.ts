import { ClientDto } from "interfaces/clientDto.interface";
import removerCaracteresCpf from "utils/removerCaracteresCpf";

export async function editClient(
    formData: ClientDto,
    editClient: { clientDto: ClientDto, idClient: string },
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
        cpf: removerCaracteresCpf(formData.cpf)
    });

    const response = await fetch(`${process.env.URL_FRONT}/api/${editClient.idClient}`, { 
        method: "PATCH",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    setMensagemUsuario(responseObj.mensagemUsuario);  
}