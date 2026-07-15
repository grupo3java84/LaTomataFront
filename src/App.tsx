import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import { Navbar } from './componentes/navbar/Navbar.tsx';
import { Footer } from './componentes/footer/Footer.tsx';
import Categorias from './pages/categoria/Categoria.tsx';
import Produtos from './pages/produtos/Produtos.tsx';
import FormCategoria from './componentes/categoria/formcategoria/FormCategoria.tsx';
import FormProduto from './componentes/produtos/formProduto/FormProduto.tsx';
import DeletarCategoria from './componentes/categoria/deletarcategoria/DeletarCategoria.tsx';
import DeletarProduto from './componentes/produtos/deletarProduto/DeletarProduto.tsx'
import SobreNos from './pages/sobrenos/SobreNos.tsx';
import Cadastro from './pages/usuario/cadastro/Cadastro.tsx';
import Login from './pages/usuario/login/Login.tsx';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-cream text-dark font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              <Route path='/sobrenos' element={<SobreNos />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}