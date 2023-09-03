import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Client } from 'interfaces/client.interface';
import { ClientFormated } from 'interfaces/clientFormated.interface';
import formatarCPF from 'utils/formatCpf';
import upperCaseFirstLetter from 'utils/upperCaseFirstLetter';
import formatStringToDate from 'utils/formatStringToDate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import handleEditClick from 'utils/handleEditClick';
import ModalDeleteClient from './ModalDeleteClient';

type Props =  {
  rows: Client[]
}

export default function DataGridClients({ rows }: Props) {
  const [rowsFormated, setRowsFormated] = useState<ClientFormated[]>([])
  const [delectedClient, setDelectedClient] = useState<string>()
  const [clientToDelete, setClientToDelete] = useState<string>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 125,
    },
    {
      field: 'estadoCivil',
      headerName: 'Estado Civil',
      width: 100,
    },
    {
      field: 'dataNascimento',
      headerName: 'Data de Nascimento',
      description: 'This column has a value getter and is not sortable.',
      width: 100,
      type: 'date'
    },
    {
      field: 'updatedAt',
      headerName: 'Atualização',
      description: 'Essa é a data da última atualização do cliente no nosso sistema.',
      width: 100,
      type: 'date'
    },
    {
      field: 'createdAt',
      headerName: 'Criação',
      description: 'Essa é a data que o cliente foi registrado no nosso sistema.',
      width: 100,
      type: 'date'
    },
    {
      field: 'delete',
      headerName: 'Apagar',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => {            
            setClientToDelete(params.row.id)
            setIsDeleteModalOpen(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <DeleteIcon color="error" />
        </button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleEditClick(params.row.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <EditIcon color="primary" />
        </button>
      ),
    },
  ];

  useEffect(()=>{
    if (rows) {
      const arrayRowsFormated = rows.map((clientInfo: Client) => {
        return {
          id: clientInfo.id,
          nome: clientInfo.nome,
          cpf: formatarCPF(clientInfo.cpf),
          estadoCivil: upperCaseFirstLetter(clientInfo.estadoCivil),
          dataNascimento: formatStringToDate(clientInfo.dataNascimento),
          updatedAt: new Date(clientInfo.updatedAt),
          createdAt: new Date(clientInfo.createdAt)
        }  
      })
      setRowsFormated(arrayRowsFormated);
    }
  },[rows])

  useEffect(()=>{
    if (delectedClient) {
      const arrayWithoutDelected = rowsFormated.filter(client => client.id !== delectedClient);
      setRowsFormated(arrayWithoutDelected);
    }
  },[delectedClient])

  return (
    <Box sx={{ height: 630, width: '100%' }}>
      <DataGrid
        rows={rowsFormated}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
      <ModalDeleteClient 
        setIsDeleteModalOpen={setIsDeleteModalOpen} 
        isDeleteModalOpen={isDeleteModalOpen} 
        setDelectedClient={setDelectedClient} 
        clientToDelete={clientToDelete} 
      />
    </Box>
  );
}
