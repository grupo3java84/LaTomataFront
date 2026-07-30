import { useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import CardProduto from "../cardProduto/CardProduto";
import { get } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CarregandoPixel from "../../loader/CarregandoPixel";

function ListaProdutos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");

  async function buscarProdutos() {
    setIsLoading(true);
    try {
      await get('/produtos', setProdutos);
    } catch (error: any) {
      ToastAlerta("Erro ao carregar o cardápio. Tente novamente mais tarde.", "error");
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
      {isLoading && <CarregandoPixel />}

      {!isLoading && (
        <div className="container mx-auto px-4 font-mono">
          <div className="flex justify-center max-w-7xl w-full mx-auto mb-10 px-4 gap-6">
            {["todos", "saudaveis"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltro(tipo)}
                className={`font-black uppercase tracking-[0.15em] text-xs transition-all duration-200 pb-2 border-b-4 
                ${filtro === tipo
                    ? "text-[#2b5c40] border-[#2b5c40] bg-[#f4ebe1] px-4"
                    : "text-[#4a3b32]/50 border-transparent hover:text-[#4a3b32]/80 px-4"
                  }`}
              >
                {tipo === "todos" ? "Todos os pratos" : "Opções saudáveis"}
              </button>
            ))}
          </div>

          {produtosFiltrados.length === 0 ? (
            <div className="text-center my-20">
              <p className="text-lg text-[#4a3b32]/70 font-black uppercase tracking-wider">Nenhum produto encontrado!</p>
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