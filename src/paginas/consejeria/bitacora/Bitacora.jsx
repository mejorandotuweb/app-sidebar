import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc,Timestamp,addDoc } from "firebase/firestore";

import Layout from "../../../componentes/layout/Layout";

import MaterialReactTable from 'material-react-table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { Delete, Edit } from '@mui/icons-material';


import db from '../../../realm/firebaseDB';

function Bitacora( ) {

  const [bitacora, setBitacora] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Autor, setAutor] = useState('');
  const [Comentario, setComentario] = useState('');
  const [Unidad, setUnidad] = useState('');
  //OBTENER DATA DE FIREBASE
  const ObtenerBitacora = async () => {

    await getDocs(collection(db, "bitacora"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
          setBitacora(newData);                
    })

  }
  //AGREGAR DATA DE FIREBASE
  const AgregarBitacora = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'bitacora'), {
        Autor: Autor,
        Comentario: Comentario,
        Unidad: Unidad,
        Fecha: Timestamp.now()
      })
      ObtenerBitacora();
      handleClose();
    } catch (err) {
      alert(err)
    }
  }
  
  //ELIMINAR DATA DE FIREBASE
  const eliminar =  async (id) => {
    const taskDocRef = doc(db, 'bitacora', id.row._valuesCache.id)
    try{
      await deleteDoc(taskDocRef)
      ObtenerBitacora();
    } catch (err) {
      alert(err)
    }

  }

  //DECLARO VARIBLE PARA OBTENER DATA EN TABLA
  const columns= [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'Autor', header: 'Autor' },
    { accessorKey: 'Comentario', header: 'Comentario' },
    { accessorKey: 'Unidad', header: 'Unidad' }
  ];

 //ESTILO

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  useEffect(() => {

    ObtenerBitacora();

  }, [])
  
  return (
    <Layout>
      <h1>Bitacora</h1>
      <Button onClick={handleOpen}>AGREGAR USUARIO</Button>
      <MaterialReactTable columns={columns} data={bitacora}   enableRowActions
  renderRowActions={(row, index) => (
    <Box>
      <IconButton onClick={() => console.info('Edit')} >
        <Edit />
      </IconButton>
      <IconButton onClick={() => eliminar(row)}>
        <Delete />
      </IconButton>
    </Box>
  )} />

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div >
      <h3>Agregar Nuevo Usuario</h3>
      <form onSubmit={AgregarBitacora} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='Autor' 
          onChange={(e) => setAutor(e.target.value.toUpperCase())} 
          value={Autor}
          placeholder='Enter title'/>
       <input 
          type='text' 
          name='Comentario' 
          onChange={(e) => setComentario(e.target.value.toUpperCase())} 
          value={Comentario}
          placeholder='Enter Comentario'/>
           <input 
          type='text' 
          name='Unidad' 
          onChange={(e) => setUnidad(e.target.value.toUpperCase())} 
          value={Unidad}
          placeholder='Enter Unidad'/>
        <Button type='submit'>AGREGAR</Button>
      </form> 


      <div align="right">
        <Button onClick={()=>handleClose()}>SALIR</Button>
      </div>
    </div>
  </Box>
</Modal>



    
  

    </Layout>
  );
}

export default Bitacora;