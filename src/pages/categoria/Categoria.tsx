import ListaCategorias from "../../componentes/categoria/listarcategorias/ListarCategorias";
import { Link } from "react-router-dom";

function Categorias() {
  return (
    <div className="container mx-auto my-12 px-4 font-mono text-[#4a3b32]">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#2b5c40] tracking-tight uppercase">Gestão de Categorias</h1>
        <p className="text-xs font-bold text-[#4a3b32]/70 uppercase tracking-widest mt-2">Adicione, edite ou remova categorias do cardápio</p>
        
        <div className="mt-6">
          <Link 
            to="/categorias/cadastrar" 
            className="bg-[#b33939] hover:bg-[#9c2e2e] text-white font-black py-3.5 px-6 text-xs uppercase tracking-widest rounded-none border-2 border-[#2b5c40] transition-all shadow-[4px_4px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 inline-block"
          >
            + Nova Categoria
          </Link>
        </div>
      </div>
      
      <ListaCategorias />
    </div>
  );
}

export default Categorias;