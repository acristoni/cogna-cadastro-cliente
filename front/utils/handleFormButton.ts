import { ClientDto } from "interfaces/clientDto.interface";
import { EditOrCreate } from "enums/editOrCreate.enum";
import { editClient as editClientService } from "service/editClient.service";
import { createClient as createClientService } from "service/createClient.service";

const handleFormButton = async (
    setIsLoading: (value: boolean) => void,
    formData: ClientDto,
    editOrCreate: EditOrCreate,
    editClient: { clientDto: ClientDto, idClient: string } | undefined,
    setMensagemUsuario: (value: string) => void,
    setIsModalOpen: (value: boolean) => void
) => {
    setIsLoading(true);

    if (editOrCreate === EditOrCreate.EDIT && editClient) {
        editClientService(
            formData,
            editClient,
            setMensagemUsuario,
        )          
    } else {            
        createClientService(
            formData,
            setMensagemUsuario,
        )
    }
    setIsModalOpen(true);
    setIsLoading(false);
}

export default handleFormButton;