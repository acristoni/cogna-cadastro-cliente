'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResizePanel from "react-resize-panel";
import { Client } from 'interfaces/client.interface';
import DataGridClients from '@/components/DataGrid';
import Button from '@mui/material/Button';
import ClientForm from '@/components/ClientForm';
import { ClientDto } from 'interfaces/clientDto.interface';
import getClients from '../../service/getClients.service';

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [clientList, setClientList] = useState<Client[]>();
  const [editClient, setEditClient] = useState<{ clientDto: ClientDto, idClient: string }>();
  
  useEffect(()=>{
    getClients(setClientList)
  },[]);

  useEffect(()=>{
    if (editClient) {
      setIsDrawerOpen(true)
    }
  },[editClient])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end'
      }}
    >
      <Box 
        sx={{
          borderRight: '1px solid #dcdcdc', 
          borderLeft: '1px solid #dcdcdc', 
          flexGrow: 2, 
          height: '690px',
          position: 'relative'
        }}
      >
        <>
          {
            clientList ?
            <DataGridClients rows={clientList} setEditClient={setEditClient}/> :
            <Typography>
              Carregando informações...
            </Typography>
          }
        </>
        <Button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
          variant="contained" 
          color={ !isDrawerOpen ? "primary" : "error" }
          sx={{
            position: 'absolute',
            bottom: '10px',
            right: '10px'
          }}
          id="ButtonNewClient"
        >
          { !isDrawerOpen ? 'Novo Cliente' : 'Cancelar'}
        </Button>
      </Box>
      <ResizePanel 
        direction="w" 
        style={{
          flexGrow: 1,  
          display: isDrawerOpen ? 'flex' : 'none',
        }}
      >
        <Box 
          sx = {{ 
            minWidth: '200px',
            width:'100%',
            boxSizing: 'border-box',
            textAlign: 'center',
            flexGrow: 1 
          }}
        >
          <ClientForm 
            editClient={editClient}
            isDrawerOpen={isDrawerOpen}
          />          
        </Box>
      </ResizePanel>
    </Box>
  );
}
