import React, { useMemo,useEffect,useState } from 'react';
import Axios from "axios";
import MaterialReactTable from 'material-react-table';
import Layout from '../../componentes/layout/Layout';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { Delete, Edit } from '@mui/icons-material';



function Products() {
  const columns= [
  { accessorKey: 'nombre', header: 'nombre' },
  { accessorKey: 'correo', header: 'correo' },
];
const urlAPI = "https://apimejorandotuwebv1.cristianolivar3.repl.co/api/users"
  const [data, setData] = useState([]);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [usuario, setUsuario]=useState({
    nombre: "",
    clave: "",
    correo: "",
  })

    const handleChange=e=>{
    const {name, value}=e.target;
    setUsuario(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  useEffect(() => {
  const fetchData = async () => {
    const { data } = await Axios.get(
      urlAPI
    );
    setData(data);
    console.log(data);
  };

  fetchData();
}, []);
const peticionPost=async()=>{
    await Axios.post(urlAPI, usuario)
    .then(response=>{
      setData(data.concat(response.data));
      handleClose();
    }).catch(error=>{
      console.log(error);
    })
  }


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
 //acciones
   const eliminar=async()=>{
    await Axios.delete(urlAPI+"/"+usuario.id)
    .then(response=>{
      setData(data.filter(usuario=>usuario.id!==usuario.id));
      //abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
 
  return (
    <Layout>
      <Button onClick={handleOpen}>AGREGAR USUARIO</Button>
      <MaterialReactTable columns={columns} data={data}   enableRowActions
  renderRowActions={(row, index) => (
    <Box>
      <IconButton onClick={() => console.info('Edit')} >
        <Edit />
      </IconButton>
      <IconButton onClick={() => eliminar(data.id)}>
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
      <TextField  label="Nombre" name="nombre" onChange={handleChange}/>
      <br />
      <TextField  label="Clave" name="clave" onChange={handleChange}/>          
<br />
<TextField  label="Correo" name="correo" onChange={handleChange}/>
      <br />

      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>handleClose()}>Cancelar</Button>
      </div>
    </div>
  </Box>
</Modal>
    </Layout>
  );
};

export default Products;