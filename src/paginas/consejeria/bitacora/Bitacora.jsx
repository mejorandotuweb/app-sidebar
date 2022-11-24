import React, { useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import Layout from "../../../componentes/layout/Layout";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { Delete, Edit } from '@mui/icons-material';

import db from '../../../realm/conexion';

function Bitacora() {

  const [bitacora, setBitacora] = useState([])
  const ObtenerBitacora = async () => {

    const response = db.collection('bitacora');

    const data = await response.get();

    data.docs.forEach(item => {

      setBitacora([...bitacora, item.data()])

    })

  }

  useEffect(() => {

    ObtenerBitacora();

  }, [])
  
  return (
    <Layout>
      <h1>Bitacora</h1>
    </Layout>
  );
}

export default Bitacora;