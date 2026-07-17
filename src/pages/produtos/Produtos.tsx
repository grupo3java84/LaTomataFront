import { Link } from "react-router-dom";
import ListaProdutos from "../../componentes/produtos/listaProdutos/ListaProdutos";

function Produtos() {
  return (
    <div className="container mx-auto my-12 px-4">
      {/* Container centralizado */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-black text-slate-800">Gestão de Cardápio</h1>
        <p className="text-slate-500 mt-2">Adicione, edite ou remova produtos do cardápio</p>
        
        {/* Botão centralizado logo abaixo */}
        <div className="mt-6">
          <Link
            to="/produtos/cadastrar"
            className="bg-[#9e0000] hover:bg-red-800 text-white font-bold py-3 px-6 text-sm rounded-full transition-all shadow-lg"
          >
            + Novo Produto
          </Link>
        </div>
      </div>

      <ListaProdutos />
    </div>
  );
}

export default Produtos;