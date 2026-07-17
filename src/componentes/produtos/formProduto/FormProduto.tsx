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
      await get("/categorias", setCategorias
        , {headers: { 'Authorization': token }}
      );
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
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
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
        ToastAlerta('Sessão expirada! Redirecionando para login.', 'erro');
        handleLogout(); 
      } else {
        ToastAlerta('Erro ao salvar o Produto. Verifique os dados.', 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

    return (
  <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4">
    {/* Card do Formulário */}
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
      
      {/* Título (sem a faixa vermelha, estilo limpo) */}
      <div className="py-8 px-8 text-slate-800 font-black text-2xl uppercase tracking-widest text-center border-b border-slate-100">
        {id ? 'Editar Produto' : 'Cadastrar Produto'}
      </div>

      {/* Área do Formulário */}
      <form className="flex flex-col" onSubmit={gerarNovoProduto}>
        <div className="p-8 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-slate-600 text-sm font-bold">Nome do Produto</label>
            <input type="text" name="nome" required className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-red-500 outline-none transition-all" value={produto.nome} onChange={atualizarEstado} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-600 text-sm font-bold">Descrição</label>
            <textarea name="descricao" rows={3} className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-red-500 outline-none resize-none transition-all" value={produto.descricao} onChange={atualizarEstado} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-600 text-sm font-bold">Preço (R$)</label>
            <input type="number" name="preco" step="0.01" required className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-red-500 outline-none transition-all" value={produto.preco} onChange={atualizarEstado} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-600 text-sm font-bold">URL da Foto</label>
            <input type="text" name="foto" className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-red-500 outline-none transition-all" value={produto.foto} onChange={atualizarEstado} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-600 text-sm font-bold">Categoria</label>
            <select name="categoria" className="border-2 border-slate-200 rounded-xl p-3 w-full bg-white focus:border-red-500 outline-none cursor-pointer" value={produto.categoria?.id || ""} onChange={atualizarEstado}>
              <option value="" disabled>Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.descricao}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-slate-600 font-bold text-sm cursor-pointer">
              <input type="checkbox" name="disponivel" checked={produto.disponivel} onChange={atualizarEstado} className="w-4 h-4 accent-red-500" />
              Disponível
            </label>
            <label className="flex items-center gap-2 text-slate-600 font-bold text-sm cursor-pointer">
              <input type="checkbox" name="saudavel" checked={produto.saudavel} onChange={atualizarEstado} className="w-4 h-4 accent-red-500" />
              Saudável
            </label>
          </div>
        </div>

        {/* Rodapé dos botões */}
        <div className="flex border-t border-slate-100">
          <button type="button" onClick={retornar} className="w-full py-4 text-slate-500 hover:bg-slate-50 font-bold transition-all border-r border-slate-100">
            Cancelar
          </button>
          <button type="submit" disabled={isLoading} className="w-full py-4 text-red-600 hover:bg-red-50 font-bold transition-all flex justify-center items-center">
            {isLoading ? <ClipLoader color="#dc2626" size={20} /> : (id ? 'Atualizar' : 'Cadastrar')}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

  export default FormProduto;