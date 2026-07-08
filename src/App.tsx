import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import { Navbar } from './componentes/navbar/Navbar.tsx';
import { Footer } from './componentes/footer/Footer.tsx';

export default function App() {
  return (
    <BrowserRouter>
     
      <div className="flex flex-col min-h-screen bg-cream text-dark font-sans">
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}