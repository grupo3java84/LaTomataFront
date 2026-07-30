import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar, get } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import CardProduto from "../cardProduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(idString: string) {
    try {
      await get(`/produtos/${idString}`, (dados: Produto) => {
        setProduto(dados);
      }, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    try {
      setIsLoading(true);

      await deletar(`/produtos/${id}`, {
        headers: { 'Authorization': token }
      });

      ToastAlerta('Produto excluído com sucesso!', 'sucesso');
      retornar();
    } catch (error: any) {
      ToastAlerta('Erro ao deletar o Produto.', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="container flex flex-col items-center mx-auto my-12 px-4 font-mono text-[#4a3b32]">
      <h1 className="text-3xl md:text-4xl text-center my-4 font-black text-[#2b5c40] uppercase tracking-tight">
        Deletar Produto
      </h1>

      <p className="text-xs font-bold text-[#4a3b32]/80 uppercase tracking-widest text-center mb-8">
        Você tem certeza de que deseja apagar o produto abaixo?
      </p>

      {produto ? (
        <CardProduto produto={produto}>
          <button
            className="text-[#4a3b32] hover:bg-[#f4ebe1] w-full py-3.5 font-black text-xs uppercase tracking-widest transition-all border-r-4 border-[#2b5c40]"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="text-white bg-[#b33939] hover:bg-[#9c2e2e] w-full flex items-center justify-center py-3.5 font-black text-xs uppercase tracking-widest transition-all"
            onClick={deletarProduto}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </CardProduto>
      ) : (
        <div className="py-20 text-[#4a3b32]/60 font-bold uppercase tracking-wider flex flex-col items-center gap-3">
          <ClipLoader color="#b33939" size={30} />
          <span>Carregando dados do produto...</span>
        </div>
      )}
    </div>
  );
}

export default DeletarProduto;