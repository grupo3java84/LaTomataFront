import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import deletarCategoriaService from '../../../services/Service'
import buscarCategoria from '../../../services/Service';

function DeletarCategoria() {

const navigate = useNavigate()

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      const response = await buscarCategoria(`/categorias/${id}`, {
        headers: {
          Authorization: token
        }
      })

      setCategoria(response.data)
    } catch (error: any) {
      if (error.toString().includes('401')) {
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
    setIsLoading(true)

    try {
      await deletarCategoriaService(id!, {
        headers: {
          'Authorization': token
        }
      })

      alert('Categoria apagada com sucesso')
      retornar()
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        alert('Erro ao deletar a categoria.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar categoria</h1>
      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar a categoria a seguir?</p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          Categoria
        </header>
        <p className='p-8 text-3xl bg-slate-200 h-full'>categoria</p>
        <div className="flex">
          <button
            className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'>
            Não
          </button>
          <button
            className='w-full text-slate-100 bg-indigo-400
                        hover:bg-indigo-600 flex items-center justify-center'>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeletarCategoria