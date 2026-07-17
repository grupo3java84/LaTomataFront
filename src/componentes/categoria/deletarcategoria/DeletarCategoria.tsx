import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import { get, deletar } from '../../../services/Service'; 
import { ClipLoader } from 'react-spinners';

function DeletarCategoria() {
  const navigate = useNavigate()

  // Inicializa o estado de forma controlada
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: ''
  } as Categoria)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await get(`/categorias/${id}`, setCategoria, {
        headers: {
          Authorization: token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarCategoria() {
    try {
      setIsLoading(true);

      await deletar(`/categorias/${id}`, {
        headers: { 'Authorization': token }
      });

      alert('Categoria excluída com sucesso!');
      retornar();
    } catch (error: any) {
      alert('Erro ao deletar a Categoria.');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4">
      {/* Card Principal */}
      <div className="w-full max-w-sm rounded-3xl shadow-lg border border-slate-100 overflow-hidden bg-white">

        {/* Faixa Vermelha de Título */}
        <div className="bg-[#9e0000] py-4 px-8 text-white font-bold text-lg uppercase tracking-widest text-center">
          Excluir Categoria
        </div>

        {/* Corpo do Card */}
        <div className="p-8 flex flex-col items-center gap-4 bg-slate-50">
          <p className="text-slate-600 text-center text-sm font-semibold">
            Você tem certeza que deseja excluir esta categoria?
          </p>

          <h2 className="text-2xl font-black text-slate-800 text-center py-2">
            {categoria.descricao || 'Carregando...'}
          </h2>
        </div>

        {/* Botões de Ação */}
        <div className="flex border-t border-slate-100">
          <button
            className="w-full py-3 text-slate-600 hover:bg-slate-100 font-bold transition-all border-r border-slate-100"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className="w-full py-3 text-red-600 hover:bg-red-50 font-bold transition-all flex justify-center items-center"
            onClick={deletarCategoria}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#9e0000" size={20} />
            ) : (
              'Sim, excluir'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarCategoria;
