import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardProdutoProps {
  produto: Produto;
  children?: ReactNode;
}

function CardProduto({ produto, children }: CardProdutoProps) {
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  return (
    <div className="flex flex-col bg-white rounded-none overflow-hidden border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] hover:-translate-y-1 transition-transform w-72 font-mono text-[#4a3b32]">
      <div className="w-full h-48 bg-[#fffdf9] overflow-hidden border-b-4 border-[#2b5c40]">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <h3 className="font-black text-base text-[#2b5c40] tracking-tight">{produto.nome}</h3>
        <p className="text-xs text-[#4a3b32]/80 font-medium leading-relaxed">{produto.descricao}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[#b33939] font-black text-base">
            R$ {(produto.preco || 0).toFixed(2)}
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#f4ebe1] px-2 py-1 border border-[#2b5c40]">
            {produto.categoria?.descricao}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          {produto.saudavel && (
            <span className="bg-[#3b7a57]/10 text-[#3b7a57] border border-[#3b7a57] text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              🥗 Saudável
            </span>
          )}
          <span className={`text-[10px] font-black px-2 py-0.5 uppercase tracking-widest border ${produto.disponivel ? "bg-emerald-50 text-[#3b7a57] border-[#3b7a57]" : "bg-[#b33939]/10 text-[#b33939] border-[#b33939]"}`}>
            {produto.disponivel ? "Disponível" : "Indisponível"}
          </span>
        </div>
      </div>
 
      {children ? (
        <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
          {children}
        </div>
      ) : (
        token !== '' && (
          <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
            <Link to={`/produtos/atualizar/${produto.id}`} className="w-full text-[#3b7a57] hover:bg-[#3b7a57] hover:text-white py-3 text-center font-black text-xs uppercase tracking-widest transition-all">
              Editar
            </Link>
            <div className="w-1 bg-[#2b5c40]"></div>
            <Link to={`/produtos/${produto.id}`} className="text-[#b33939] hover:bg-[#b33939] hover:text-white w-full py-3 text-center font-black text-xs uppercase tracking-widest transition-all">
              Excluir
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default CardProduto;