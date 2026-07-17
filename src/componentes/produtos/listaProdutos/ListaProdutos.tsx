import { useContext, useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import CardProduto from "../cardProduto/CardProduto";
import { get } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaProdutos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");

  async function buscarProdutos() {
    setIsLoading(true);
    try {
      await get('/produtos', setProdutos);
    } catch (error: any) {
      ToastAlerta("Erro ao carregar o cardápio. Tente novamente mais tarde.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    if (filtro === "saudaveis") return produto.saudavel === true;
    return true;
  });

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#9e0000" size={32} />
        </div>
      )}

      {!isLoading && (
        <div className="container mx-auto px-4">
          {/* Filtro Elegante Centralizado */}
          <div className="flex justify-center max-w-7xl w-full mx-auto mb-12 px-4 gap-6">
            {["todos", "saudaveis"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltro(tipo)}
                className={`font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 pb-1 border-b-2 
        ${filtro === tipo
                    ? "text-[#2d5a27] border-[#2d5a27]"
                    : "text-[#3d2b1f]/40 border-transparent hover:text-[#3d2b1f]/80"
                  }`}
              >
                {tipo === "todos" ? "Todos os pratos" : "Opções saudáveis"}
              </button>
            ))}
          </div>

          {/* Lista ou Mensagem de Vazio */}
          {produtosFiltrados.length === 0 ? (
            <div className="text-center my-20">
              <p className="text-2xl text-slate-500 font-medium">Nenhum produto encontrado!</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {produtosFiltrados.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ListaProdutos;