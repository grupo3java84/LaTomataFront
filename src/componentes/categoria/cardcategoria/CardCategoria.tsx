import { useContext } from 'react';
import { Link } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';
import { AuthContext } from '../../../contexts/AuthContext';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const qtdProdutos = categoria.produto?.length || 0;

  return (
    <div className="flex flex-col rounded-none overflow-hidden border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] bg-white w-72 font-mono text-[#4a3b32]">
      
      <div className="bg-[#b33939] py-3 px-6 text-white font-black text-xs uppercase tracking-widest border-b-4 border-[#2b5c40]">
        Categoria
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1 bg-[#fffdf9]">
        <h2 className="text-xl font-black text-[#2b5c40] tracking-tight">
          {categoria.descricao}
        </h2>

        <div className="inline-flex items-center">
          <span className="text-[10px] font-black bg-[#f4ebe1] border border-[#2b5c40] text-[#4a3b32] px-2.5 py-1 uppercase tracking-wider">
            {qtdProdutos} {qtdProdutos === 1 ? 'produto associado' : 'produtos associados'}
          </span>
        </div>
      </div>

      {token !== '' && (
        <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
          <Link 
            to={`/categorias/atualizar/${categoria.id}`}
            className="w-full text-[#3b7a57] hover:bg-[#3b7a57] hover:text-white py-3 text-center font-black text-xs uppercase tracking-widest transition-all border-r-4 border-[#2b5c40]"
          >
            Editar
          </Link>
          <Link 
            to={`/categorias/${categoria.id}`}
            className="text-[#b33939] hover:bg-[#b33939] hover:text-white w-full py-3 text-center font-black text-xs uppercase tracking-widest transition-all"
          >
            Excluir
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardCategoria;