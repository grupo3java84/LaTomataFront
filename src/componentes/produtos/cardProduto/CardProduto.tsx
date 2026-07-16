import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardProdutoProps {
  produto: Produto;
  children?: ReactNode; // ➕ Adicione esta propriedade para receber botões de fora
}

function CardProduto({ produto, children }: CardProdutoProps) {
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 bg-white w-72">
      <img
        src={produto.foto}
        alt={produto.nome}
        className="w-full h-48 object-cover"
      />

      <div className="py-4 px-6 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-bold text-slate-800">{produto.nome}</h3>
        <p className="text-sm text-slate-500">{produto.descricao}</p>

        <div className="flex justify-between items-center mt-1">
          <span className="text-green-600 font-bold text-lg">
            R$ {produto.preco.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400">{produto.categoria?.descricao}</span>
        </div>

        <div className="flex gap-2 flex-wrap mt-1">
          {produto.saudavel && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              🥗 Saudável
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${produto.disponivel ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-600"}`}>
            {produto.disponivel ? "Disponível" : "Indisponível"}
          </span>
        </div>
      </div>
 
      {/* 🔄 LÓGICA ATUALIZADA DOS BOTÕES BASE */}
      {children ? (
        // Se a tela de exclusão mandou botões customizados (Sim/Não), renderiza eles aqui dentro
        <div className="flex border-t border-slate-100 bg-slate-50">
          {children}
        </div>
      ) : (
        // Caso contrário, se o usuário estiver logado no catálogo, mostra os botões normais
        token !== '' && (
          <div className="flex border-t border-slate-100 bg-slate-50">
            <Link to={`/produtos/atualizar/${produto.id}`} className="w-full text-emerald-600 hover:bg-emerald-100 py-3 text-center font-medium transition-all">
              Editar
            </Link>
            <div className="w-px bg-slate-100"></div>
            <Link to={`/produtos/${produto.id}`} className="text-red-500 hover:bg-red-100 w-full py-3 text-center font-medium transition-all">
              Excluir
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default CardProduto;