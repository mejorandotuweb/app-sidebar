import React from 'react';
import './App.css';
import Home from "./paginas/home/Home"
import Bitacora from "./paginas/consejeria/bitacora/Bitacora"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./paginas/Login"
/*;
import Reports from './paginas/reports/Reports';
import Products from './paginas/products/Products';
import PrivateRoute from "./paginas/PrivateRoute.page";*/


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bitacora" element={<Bitacora />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;