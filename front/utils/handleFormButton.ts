import { ClientDto } from "interfaces/clientDto.interface";
import removerCaracteresCpf from "./removerCaracteresCpf";
import { EditOrCreate } from "enums/editOrCreate.enum";

const handleFormButton = async (
    setIsLoading: (value: boolean) => void,
    formData: ClientDto,
    editOrCreate: EditOrCreate,
    editClient: { clientDto: ClientDto, idClient: string } | undefined,
    setMensagemUsuario: (value: string) => void,
    setIsModalOpen: (value: boolean) => void
) => {
    setIsLoading(true);

    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
        cpf: removerCaracteresCpf(formData.cpf)
    });

    if (editOrCreate === EditOrCreate.EDIT && editClient) {
        const response = await fetch(`${process.env.URL_FRONT}/api/${editClient.idClient}`, { 
            method: "PATCH",
            body: bodyContent,
            headers: headersList
        });
        
        const data = await response.text();
        const responseObj = JSON.parse(data)
        setMensagemUsuario(responseObj.mensagemUsuario);             
    } else {            
        const response = await fetch(`${process.env.URL_FRONT}/api`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        const data = await response.text();
        const responseObj = JSON.parse(data)
        setMensagemUsuario(responseObj.mensagemUsuario);
    }
    setIsModalOpen(true);
    setIsLoading(false);
}

export default handleFormButton;