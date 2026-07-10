import { useNavigate } from "react-router-dom";

function DeletarProduto() {
  const navigate = useNavigate();

  return (
    <div className="container w-full md:w-1/3 mx-auto my-10 px-4">
      <h1 className="text-4xl text-center my-4 font-bold text-slate-800">
        Deletar Produto
      </h1>
      <div className="border border-slate-200 flex flex-col rounded-3xl overflow-hidden shadow-lg">
        <header className="py-4 px-6 bg-red-400 text-white font-bold text-xl">
          Confirmar Exclusão
        </header>
        <p className="p-8 text-lg bg-slate-50 text-slate-700">
          Tem certeza que deseja excluir este produto?
        </p>
        <div className="flex">
          <button
            className="text-slate-600 bg-slate-100 hover:bg-slate-200 w-full py-3 font-medium"
            onClick={() => navigate("/produtos")}
          >
            Não
          </button>
          <button
            className="w-full text-white bg-red-500 hover:bg-red-600 py-3 font-medium"
            onClick={() => navigate("/produtos")}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;