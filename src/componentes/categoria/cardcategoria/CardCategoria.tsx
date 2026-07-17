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
    <div className="flex flex-col rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 bg-white w-72">
      
      {/* Faixa Vermelha de Título */}
      <div className="bg-[#9e0000] py-3 px-6 text-white font-bold text-sm uppercase tracking-widest">
        Categoria
      </div>

      {/* Conteúdo: Descrição e Contagem */}
      <div className="p-8 flex flex-col gap-4 flex-1 bg-slate-50">
        <h2 className="text-2xl font-black text-slate-800 leading-tight">
          {categoria.descricao}
        </h2>

        <div className="inline-flex items-center">
          <span className="text-xs font-bold bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full">
            {qtdProdutos} {qtdProdutos === 1 ? 'produto associado' : 'produtos associados'}
          </span>
        </div>
      </div>

      {/* Botões de Ação */}
      {token !== '' && (
        <div className="flex border-t border-slate-100 bg-slate-50">
          <Link 
            to={`/categorias/atualizar/${categoria.id}`}
            className="w-full text-emerald-600 hover:bg-emerald-100 py-3 text-center font-medium transition-all"
          >
            Editar
          </Link>
          <div className="w-px bg-slate-100"></div>
          <Link 
            to={`/categorias/${categoria.id}`}
            className="text-red-500 hover:bg-red-100 w-full py-3 text-center font-medium transition-all"
          >
            Excluir
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardCategoria;