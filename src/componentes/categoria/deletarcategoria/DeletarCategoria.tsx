import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import { get, deletar } from '../../../services/Service'; // 🔄 CORRIGIDO: Importações nomeadas corretas
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
      // 🔄 CORRIGIDO: Agora usa a função get do Service repassando o setCategoria
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
      navigate('/')
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

      // 🔄 CORRIGIDO: Agora chama a função utilitária 'deletar' que executa api.delete() de verdade
      await deletar(`/categorias/${id}`, {
        headers: { 'Authorization': token }
      });

      alert('Categoria excluída com sucesso!');
      retornar();
    } catch (error: any) {
      alert('Erro ao deletar a Categoria. O servidor pode estar bloqueando o método DELETE.');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className='container w-full md:w-1/3 mx-auto my-8 px-4'>
      <h1 className='text-4xl text-center my-4 font-bold text-slate-800'>Deletar categoria</h1>
      <p className='text-center font-semibold mb-4 text-slate-600'>
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between shadow-md'>
        <header className='py-2 px-6 bg-(--color-red) text-white font-bold text-2xl'>
          Categoria
        </header>

        <p className='p-8 text-3xl bg-slate-100 h-full text-slate-800 font-medium'>
          {categoria.descricao || 'Carregando...'}
        </p>

        <div className="flex">
          <button
            className='text-slate-100 bg-amber-600/70 hover:bg-amber-600 w-full py-3 font-bold transition-all'
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>
          <button
            className='text-slate-100 bg-pink-800 hover:bg-red-600 w-full
              flex items-center justify-center py-3 font-bold transition-all'
            onClick={deletarCategoria}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarCategoria;
