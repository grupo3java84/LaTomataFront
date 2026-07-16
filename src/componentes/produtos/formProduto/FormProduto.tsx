import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { get, post } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";

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
      alert('Você precisa estar logado para gerenciar os produtos.');
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
    console.log("Formulário enviado! Dados atuais do produto:", produto);

    if (!produto.categoria || !produto.categoria.id || produto.categoria.id === 0) {
      alert("Por favor, selecione uma categoria válida para o produto.");
      return;
    }

    setIsLoading(true);
    //const tokenFormatado = token.startsWith('Bearer ') ? token : `Bearer ${token}`;


    const dadosEnvio = {
      id: id !== undefined ? Number(id) : undefined,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      foto: produto.foto,
      disponivel: produto.disponivel,
      saudavel: produto.saudavel,
      categoria: {
        id: produto.categoria.id
      }
    };

    try {
      await post(`/produtos/cadastrar`, dadosEnvio, setProduto, {
        headers: { 'Authorization': token }
      });
      alert(id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
      retornar();
    } catch (error: any) {
      if (error.toString().includes('401') || error.response?.status === 401) {
        alert('Sessão expirada! Você será redirecionado para realizar o login novamente.');
        handleLogout(); 
      } else {
        alert('Erro ao salvar o Produto. Verifique se os dados estão preenchidos.');
      }
    } finally {
      setIsLoading(false);
    }
  }

    return (
      <div className="container flex flex-col items-center mx-auto my-10 px-4">
        <h1 className="text-3xl font-bold text-slate-800 my-6">
          {id ? "Editar" : "Cadastrar"} Produto
        </h1>

        <form className="w-full md:w-1/2 flex flex-col gap-4" onSubmit={gerarNovoProduto}>
          <input
            type="text"
            placeholder="Nome do produto"
            name="nome"
            required
            className="border-2 border-red-200 rounded-xl p-4 w-full focus:border-red-400 outline-none"
            value={produto.nome}
            onChange={atualizarEstado}
          />

          <textarea
            placeholder="Descrição"
            name="descricao"
            rows={3}
            className="border-2 border-red-200 rounded-xl p-4 w-full focus:border-red-400 outline-none resize-none"
            value={produto.descricao}
            onChange={atualizarEstado}
          />

          <input
            type="number"
            placeholder="Preço"
            name="preco"
            step="0.01"
            required
            className="border-2 border-red-200 rounded-xl p-4 w-full focus:border-red-400 outline-none"
            value={produto.preco}
            onChange={atualizarEstado}
          />

          <input
            type="text"
            placeholder="URL da foto"
            name="foto"
            className="border-2 border-red-200 rounded-xl p-4 w-full focus:border-red-400 outline-none"
            value={produto.foto}
            onChange={atualizarEstado}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="categoria" className="text-slate-700 font-semibold px-1">
              Selecione a Categoria
            </label>
            <select
              name="categoria"
              id="categoria"
              className="border-2 border-red-200 rounded-xl p-4 w-full bg-white focus:border-red-400 outline-none text-slate-700 cursor-pointer"
              value={produto.categoria?.id || ""}
              onChange={atualizarEstado}
            >
              <option value="" disabled>Escolha uma opção</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.descricao}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer mt-2">
            <input
              type="checkbox"
              name="disponivel"
              checked={produto.disponivel}
              onChange={atualizarEstado}
              className="w-4 h-4 text-red-400 border-gray-300 rounded focus:ring-red-400"
            />
            Disponível
          </label>

          <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              name="saudavel"
              checked={produto.saudavel}
              onChange={atualizarEstado}
              className="w-4 h-4 text-red-400 border-gray-300 rounded focus:ring-red-400"
            />
            Saudável
          </label>

          <button
            className="rounded-full text-white bg-red-400 hover:bg-red-500 py-3 font-bold transition-all disabled:opacity-50 mt-4"
            type="submit"
            disabled={isLoading}
          >
            {id ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    );
  }

  export default FormProduto;