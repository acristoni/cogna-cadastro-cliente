import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ClientDto } from 'interfaces/clientDto.interface';
import { EstadoCivil } from 'enums/estadocivil.enum';
import { EditOrCreate } from 'enums/editOrCreate.enum';
import formatDateToString from 'utils/formatDateToString';
import ModalComplete from './ModalComplete';
import { ptBR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/pt-br';
import estadoCivilOptions from 'utils/estadoCivilOptions';
import handleFormButton from 'utils/handleFormButton';
import cpfMask from 'utils/cpfMask';

dayjs.locale('pt-br');

type Props = {
    editClient: { clientDto: ClientDto, idClient: string } | undefined;
    isDrawerOpen: boolean
}

export default function ClientForm({ editClient, isDrawerOpen }: Props) {
    const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs('1990-01-01'));
    const [mensagemUsuario, setMensagemUsuario] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editOrCreate, setEditOrCreate] = useState<EditOrCreate>(EditOrCreate.CREATE);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<ClientDto>({
        nome: '',
        dataNascimento: '',
        cpf: '',
        estadoCivil: EstadoCivil.CASADO,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
      
        if (name === 'cpf') {
          const formattedCPF = cpfMask(value);      
          setFormData({ ...formData, [name]: formattedCPF || '' });
        } else {
          setFormData({ ...formData, [name]: value });
        }
    };

    useEffect(()=>{
        if (valueDate) {
            const dataFormatada = valueDate.format("YYYY-MM-DD")
            setFormData({ ...formData, dataNascimento: dataFormatada})
        }
    },[valueDate])

    useEffect(()=>{
        if (editClient) {
            const dateNascimento = dayjs(editClient.clientDto.dataNascimento);
            setValueDate(dateNascimento);

            setFormData({
                ...editClient.clientDto,
                dataNascimento: formatDateToString(editClient.clientDto.dataNascimento)
            });
            setEditOrCreate(EditOrCreate.EDIT);
        }
    },[editClient])

    useEffect(()=>{
        if (!isDrawerOpen) {
            setEditOrCreate(EditOrCreate.CREATE);
            setFormData({
                nome: '',
                dataNascimento: '',
                cpf: '',
                estadoCivil: EstadoCivil.CASADO,
            });
            setValueDate(dayjs('1990-01-01'));
        }
    },[isDrawerOpen])

    return (
        <Box sx={{ p: 3 }}>
            <ModalComplete 
                setIsModalOpen={setIsModalOpen} 
                isModalOpen={isModalOpen} 
                mensagemUsuario={mensagemUsuario} 
            />
            <h2>Formulário { editOrCreate === EditOrCreate.EDIT? 'Editar' : 'Novo' } Cliente</h2>
            <TextField
                name="nome"
                label="Nome"
                fullWidth
                value={formData.nome}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
            />
            <LocalizationProvider 
                dateAdapter={AdapterDayjs}
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <DemoContainer components={['DatePicker']}  sx={{ marginBottom: 3, width: '100%' }}>
                    <DatePicker 
                        label="Data de Nascimento"
                        value={valueDate}
                        onChange={(newValue) => setValueDate(newValue)}
                        sx={{ width: '100%' }}
                        format="DD-MM-YYYY"
                    />
                </DemoContainer>
            </LocalizationProvider>
            <TextField
                name="cpf"
                label="CPF"
                fullWidth
                value={formData.cpf}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
                placeholder="123.456.789-00"
                inputProps={{ maxLength: 14 }}
            />
            <FormControl fullWidth>
            <InputLabel htmlFor="estadoCivil" sx={{backgroundColor: 'white', px: 1}}>Estado Civil</InputLabel>
            <Select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
            >
                {estadoCivilOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.title}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <Button 
                id="ButtonSave"
                variant="contained" 
                color="primary"
                onClick={()=>handleFormButton(
                    setIsLoading,
                    formData,
                    editOrCreate,
                    editClient,
                    setMensagemUsuario,
                    setIsModalOpen
                )}
            >
                {
                    !isLoading ?
                    <Typography>{ editOrCreate === EditOrCreate.EDIT? 'Editar' : 'Salvar' }</Typography> :
                    <CircularProgress color="inherit"/>
                }
                
            </Button>
        </Box>
    );
};
