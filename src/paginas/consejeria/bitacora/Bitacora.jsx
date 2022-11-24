import React, { useEffect, useState } from 'react';

import Layout from "../../../componentes/layout/Layout";


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