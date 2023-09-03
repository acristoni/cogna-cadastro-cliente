'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import ResizePanel from "react-resize-panel";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
      }}
    >
      <ResizePanel 
        direction="e" 
        style={{ flexGrow: 1 }}
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
            filtros
          </Typography>           
        </Box>
      </ResizePanel>
      <Box 
        sx={{
          borderRight: '1px solid #dcdcdc', 
          borderLeft: '1px solid #dcdcdc', 
          flexGrow: 2, 
          height: '809px'
        }}
      >
        <Typography variant="overline" sx={{ fontWeight: 500 }}>
          COnteúdo
        </Typography> 
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
