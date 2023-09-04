import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type Props = {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
    mensagemUsuario: string
}

export default function ModalComplete({ setIsModalOpen, isModalOpen, mensagemUsuario }: Props) {
    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
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
                    p: 2,
                    textAlign: 'center'
                }}
            >
                <p style={{ marginBottom: '20px', marginTop: 0 }}>{mensagemUsuario}</p>
                <Button 
                    onClick={() => setIsModalOpen(false)} 
                    variant="contained" 
                    color="primary"
                    id="ButtonClose"
                >
                    Fechar
                </Button>
            </Box>
        </Modal>
    )
}