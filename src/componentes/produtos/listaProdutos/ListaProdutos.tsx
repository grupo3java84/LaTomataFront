import { useContext, useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import CardProduto from "../cardProduto/CardProduto";
import { useNavigate } from "react-router-dom";
import { get } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { SyncLoader } from "react-spinners";

const produtosEstaticos: Produto[] = [
  { id: 9991, nome: "Bruschetta", descricao: "Pão tostado com tomate fresco, manjericão e azeite.", preco: 28.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_bruschetta.png", categoria: { id: 1, tipo: "Entradas" } },
  { id: 9992, nome: "Caprese", descricao: "Salada de tomate, muçarela de búfala e manjericão.", preco: 34.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_caprese.png", categoria: { id: 1, tipo: "Entradas" } },
  { id: 9993, nome: "Pato Confitado", descricao: "Pato confitado com molho de laranja e legumes.", preco: 89.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_duck.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9994, nome: "Cordeiro Grelhado", descricao: "Carré de cordeiro grelhado com ervas finas e purê.", preco: 95.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_lamb.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9995, nome: "Medalhão", descricao: "Medalhão de filé mignon ao molho de cogumelos.", preco: 79.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_medallion.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9996, nome: "Polvo Grelhado", descricao: "Polvo grelhado com azeite, alho e batatas rústicas.", preco: 98.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_octopus.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9997, nome: "Massa ao Molho", descricao: "Massa fresca artesanal ao molho de tomate e manjericão.", preco: 52.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_pasta.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9998, nome: "Salada Gourmet", descricao: "Mix de folhas, nozes, queijo grana padano e vinagrete.", preco: 38.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_salad.png", categoria: { id: 4, tipo: "Saladas" } },
  { id: 9999, nome: "Salmão Grelhado", descricao: "Filé de salmão grelhado com legumes no vapor e limão.", preco: 72.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_salmon.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 9990, nome: "Tartare de Atum", descricao: "Atum fresco marinado com gergelim, gengibre e molho shoyu.", preco: 64.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_tartare.png", categoria: { id: 1, tipo: "Entradas" } },
];

function ListaProdutos() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produtos, setProduto] = useState<Produto[]>(produtosEstaticos);
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    buscarProdutos();
  }, [produtosEstaticos]);

  async function buscarProdutos() {

    try {
      setIsLoading(true);

      let dadosDaAPI: Produto[] = [];

      await get('/produtos', (dados: Produto[]) => {
        dadosDaAPI = dados;
      });
      if (dadosDaAPI && dadosDaAPI.length > 0) {
        // Cria uma lista unificada contendo os estáticos + os novos da API
        setProduto([...produtosEstaticos, ...dadosDaAPI]);
      } else {
        // Se a API falhar ou estiver vazia, mantém apenas os estáticos
        setProduto(produtosEstaticos);
      }
    } catch (error: any) {
      console.log("Mantendo produtos estáticos para visualização. Detalhe técnico:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  {/*catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        handleLogout();
      } else {
        console.error("Erro ao carregar o cardápio de produtos:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }*/}

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">


          {(produtos.length === 0 && !isLoading) && (
            <span className="text-3xl text-center my-8 text-slate-500 font-medium">
              Nenhum produto foi encontrado!
            </span>
          )}
          
          {/*{(!isLoading && produtos.length === 0) && (
            <span className="text-3xl text-center my-8">
              Nenhuma produto foi encontrado!
            </span>
          )}*/}

          <div className="max-w-7xl mx-auto my-12 px-4">
            <div className="flex flex-wrap justify-center gap-8">
              {produtos.map((produto) => (
                <CardProduto
                  key={produto.id}
                  produto={produto}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;