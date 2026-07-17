import ListaCategorias from "../../componentes/categoria/listarcategorias/ListarCategorias";
import { Link } from "react-router-dom";

function Categorias() {
  return (
    <div className="container mx-auto my-12 px-4">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-800">Gestão de Categorias</h1>
        <p className="text-slate-500 mt-2">Adicione, edite ou remova categorias do cardápio</p>
      </div>
      <div className="flex justify-end mb-8">
        <Link 
          to="/categorias/cadastrar" 
          className="bg-(--color-red) hover:bg-red-700 text-white font-bold py-2 px-3 text-sm rounded-full transition-all shadow-lg whitespace-nowrap"
        >
          + Nova Categoria
        </Link>
      </div>
      
      <ListaCategorias />
    </div>
  );
}
export default Categorias;