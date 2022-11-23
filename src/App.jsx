import React from 'react';
import './App.css';
import { UserProvider } from "./contexts/user.context";
import Navbar from './componentes/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './paginas/home/Home';
import Login from "./paginas/Login.page";
import Reports from './paginas/reports/Reports';
import Products from './paginas/products/Products';
import PrivateRoute from "./paginas/PrivateRoute.page";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/products' element={<Products />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;