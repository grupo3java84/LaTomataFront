import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar, get } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import CardProduto from "../cardProduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarProduto() {
  const navigate = useNavigate()

  const [produto, setProduto] = useState<Produto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(idString: string) {
    try {
      await get(`/produtos/${idString}`, (dados: Produto) => {
        setProduto(dados);
      }, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

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
    navigate("/produtos")
  }


  return (
    <div className="container flex flex-col items-center mx-auto my-10 px-4">
      <h1 className="text-4xl text-center my-4 font-bold text-slate-800">
        Deletar Produto
      </h1>

      <p className="text-base text-slate-600 font-medium text-center mb-6">
        Você tem certeza de que deseja apagar o produto abaixo?
      </p>

      {produto ? (
        <CardProduto produto={produto}>
          <button
            className="text-slate-700 hover:bg-slate-200 w-full py-3 font-bold transition-all border-r border-slate-100"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="text-slate-100 bg-red-500 hover:bg-red-600 w-full flex items-center justify-center py-3 font-bold transition-all"
            onClick={deletarProduto}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </CardProduto>
      ) : (
        <div className="py-20 text-slate-400 font-medium flex flex-col items-center gap-2">
          <ClipLoader color="#EF4444" size={30} />
          <span>Carregando dados do produto...</span>
        </div>
      )}
    </div>
  );
}

export default DeletarProduto;