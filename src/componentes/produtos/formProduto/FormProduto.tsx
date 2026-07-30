import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { get, post } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [produto, setProduto] = useState<Partial<Produto>>({
    nome: "",
    descricao: "",
    preco: 0,
    foto: "",
    disponivel: true,
    saudavel: false,
    categoria: null
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function carregarCategorias() {
    try {
      await get("/categorias", setCategorias, { headers: { 'Authorization': token } });
    } catch (error: any) {
      console.error("Erro ao carregar categorias para o formulário", error);
    }
  }

  async function buscarPorId(id: string) {
    try {
      await get(`/produtos/${id}`, setProduto, {
        headers: {
          'Authorization': token
        }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      navigate('/login');
      ToastAlerta('Você precisa estar logado para gerenciar os produtos.', 'info');
    } else {
      carregarCategorias(); 
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/produtos");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;

    if (name === "categoria") {
      setProduto({
        ...produto,
        categoria: {
          id: Number(value), 
          descricao: ""
        }
      });
      return;
    }

    const checked = (e.target as HTMLInputElement).checked;
    setProduto({ ...produto, [name]: type === "checkbox" ? checked : value });
  }

  async function gerarNovoProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!produto.categoria || !produto.categoria.id || produto.categoria.id === 0) {
      ToastAlerta("Por favor, selecione uma categoria válida para o produto.", "info");
      return;
    }

    setIsLoading(true);

    const dadosEnvio = {
      id: id !== undefined ? Number(id) : undefined,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      foto: produto.foto,
      disponivel: produto.disponivel,
      saudavel: produto.saudavel,
      categoria: { id: produto.categoria.id }
    };

    try {
      await post(`/produtos/cadastrar`, dadosEnvio, setProduto, {
        headers: { 'Authorization': token }
      });
      
      ToastAlerta(id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!', 'sucesso');
      retornar();
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        ToastAlerta('Sessão expirada! Redirecionando para login.', 'error');
        handleLogout(); 
      } else {
        ToastAlerta('Erro ao salvar o Produto. Verifique os dados.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4 font-mono text-[#4a3b32]">
      <div className="w-full max-w-lg bg-white rounded-none border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] overflow-hidden">
        
        <div className="py-6 px-8 text-[#2b5c40] font-black text-2xl uppercase tracking-tight text-center border-b-4 border-[#2b5c40] bg-[#fffdf9]">
          {id ? 'Editar Produto' : 'Cadastrar Produto'}
        </div>

        <form className="flex flex-col" onSubmit={gerarNovoProduto}>
          <div className="p-8 flex flex-col gap-5">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Nome do Produto</label>
              <input type="text" name="nome" required className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" value={produto.nome} onChange={atualizarEstado} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Descrição</label>
              <textarea name="descricao" rows={3} className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs resize-none" value={produto.descricao} onChange={atualizarEstado} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Preço (R$)</label>
              <input type="number" name="preco" step="0.01" required className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" value={produto.preco} onChange={atualizarEstado} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">URL da Foto</label>
              <input type="text" name="foto" className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" value={produto.foto} onChange={atualizarEstado} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Categoria</label>
              <select name="categoria" className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#b33939] cursor-pointer" value={produto.categoria?.id || ""} onChange={atualizarEstado}>
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer">
                <input type="checkbox" name="disponivel" checked={produto.disponivel} onChange={atualizarEstado} className="w-4 h-4 accent-[#3b7a57] rounded-none border-2 border-[#2b5c40]" />
                Disponível
              </label>
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer">
                <input type="checkbox" name="saudavel" checked={produto.saudavel} onChange={atualizarEstado} className="w-4 h-4 accent-[#3b7a57] rounded-none border-2 border-[#2b5c40]" />
                Saudável
              </label>
            </div>
          </div>

          <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
            <button type="button" onClick={retornar} className="w-full py-4 text-[#4a3b32] hover:bg-[#f4ebe1] font-black text-xs uppercase tracking-widest transition-all border-r-4 border-[#2b5c40]">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="w-full py-4 text-white bg-[#b33939] hover:bg-[#9c2e2e] font-black text-xs uppercase tracking-widest transition-all flex justify-center items-center">
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : (id ? 'Atualizar' : 'Cadastrar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;