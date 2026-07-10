import { Link } from "react-router-dom";
import ListaProdutos from "../../componentes/produtos/listaProdutos/ListaProdutos";

function Produtos() {
  return (
    <div className="container mx-auto my-12 px-4">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-800">Gestão de Cardápio</h1>
        <p className="text-slate-500 mt-2">Adicione, edite ou remova produtos do cardápio</p>
        
        <div className="flex justify-center mt-6">
          <Link
            to="/cadastrarproduto"
            className="bg-[var(--color-red)] hover:bg-red-700 text-white font-bold py-2 px-3 text-sm rounded-full transition-all shadow-lg whitespace-nowrap"
          >
            + Novo
          </Link>
        </div>
      </div>

      <ListaProdutos />
    </div>
  );
}

export default Produtos;