import { useContext } from 'react'
import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { AuthContext } from '../../../contexts/AuthContext' 

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {

  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  return (
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between shadow-sm bg-white'>
      <header className='bg-(--color-red) py-2 px-6  text-white font-bold text-2xl'>Categoria</header>

      <p className='p-8 text-3xl bg-mustard h-full text-slate-700'>{categoria.descricao}</p>

      {token !== '' && (
        <div className="flex border-t">
          <Link to={`/categorias/atualizar/${categoria.id}`}
            className='w-full text-slate-100 bg-amber-600/70 hover:bg-amber-600
              flex items-center justify-center py-3 font-bold transition-all'>
            <button>Editar</button>
          </Link>

          <Link to={`/categorias/${categoria.id}`}
            className='text-slate-100 bg-pink-800 hover:bg-red-600 w-full
              flex items-center justify-center py-3 font-bold transition-all'>
            <button>Deletar</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CardCategoria;
