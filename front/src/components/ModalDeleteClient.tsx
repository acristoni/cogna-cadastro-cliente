import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

type Props = {
    setIsDeleteModalOpen: (value: boolean) => void;
    isDeleteModalOpen: boolean;
    setDelectedClient: (value: string) => void;
    clientToDelete: string | undefined;
}

export default function ModalDeleteClient({ isDeleteModalOpen, setIsDeleteModalOpen, setDelectedClient, clientToDelete  }: Props) {
    const [deleteConcluido, setDeleteConcluido] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mensagemConcluido, setMensagemConcluido] = useState<string>("");

    useEffect(()=>{
        if (isDeleting)  {
            const deleteClient = async () => {
                const res = await fetch(`${process.env.URL_FRONT}/api/${clientToDelete}`, {
                    method: "DELETE",
                })
                if (res.status === 200 && clientToDelete) {
                    setDelectedClient(clientToDelete)
                    setMensagemConcluido('Usuário excluído com sucesso!')
                } else {
                    setMensagemConcluido('Tivemos um problema interno, tente novamente mais tarde ou entre em contato conosco!')
                }
            }
            deleteClient()
            setIsDeleting(false)
            setDeleteConcluido(true)
        }
    },[isDeleting])

    useEffect(()=>{
        setIsDeleting(false)
        setDeleteConcluido(false)        
    },[isDeleteModalOpen])

    return (
        <Modal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    p: 2 
                }}
            >
            {
            isDeleting ?
            <div style={{ textAlign: 'center' }}>
                <CircularProgress />
                <p style={{ marginBottom: 0 }}>Aguarde, excluindo cliente...</p>
            </div> :
            deleteConcluido?
            <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '20px', marginTop: 0 }}>{mensagemConcluido}</p>
                <Button onClick={() => setIsDeleteModalOpen(false)} variant="contained" color="primary">Fechar</Button>
            </div>:
            <>
                <h2 
                    id="modal-title"
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '-5px'
                    }}
                >
                    Confirmação de Exclusão
                </h2>
                <p 
                    id="modal-description"
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '-5px'
                    }}
                >
                    Tem certeza de que deseja apagar este cliente? Essa ação é irreversível.
                </p>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button onClick={() => setIsDeleteModalOpen(false)} variant="contained" color="primary">Cancelar</Button>
                    <Button onClick={() => setIsDeleting(true)} variant="contained" color="error">Confirmar</Button>
                </Box>
            </>
            }
            </Box>
        </Modal>
    )
}