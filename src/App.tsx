import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import { Navbar } from './componentes/navbar/Navbar.tsx';
import { Footer } from './componentes/footer/Footer.tsx';
import Categorias from './pages/categoria/Categoria.tsx'; 
import FormCategoria from './componentes/categoria/formcategoria/FormCategoria.tsx';
import DeletarCategoria from './componentes/categoria/deletarcategoria/DeletarCategoria.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-cream text-dark font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}