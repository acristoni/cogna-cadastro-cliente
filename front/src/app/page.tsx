'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResizePanel from "react-resize-panel";
import { Client } from 'interfaces/client.interface';
import DataGridClients from '@/components/DataGrid';

export default function HomePage() {
  const [clientList, setClientList] = useState<Client[]>()
  console.log("🚀 ~ file: page.tsx:11 ~ HomePage ~ clientList:", clientList)
  
  useEffect(()=>{
    async function getClients() {
      const res = await fetch('http://localhost:3000/api')   
      const resJson = await res.json();
      setClientList( JSON.parse(resJson.data) )
      return
    }
    getClients()
  },[])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
      }}
    >
      <Box 
        sx={{
          borderRight: '1px solid #dcdcdc', 
          borderLeft: '1px solid #dcdcdc', 
          flexGrow: 2, 
          height: '809px'
        }}
      >
        {
          clientList ?
          <DataGridClients rows={clientList}/> :
          <Typography>
            Carregando informações...
          </Typography>
        }
      </Box>
      <ResizePanel 
        direction="w" 
        style={{flexGrow: 1,  }}
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
          <Typography variant="overline" sx={{ fontWeight: 500 }}>
            formulário
          </Typography>           
        </Box>
      </ResizePanel>
    </Box>
  );
}
