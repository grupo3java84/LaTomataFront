import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Partial<Produto>>({
    nome: "",
    descricao: "",
    preco: 0,
    foto: "",
    disponivel: true,
    saudavel: false,
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setProduto({ ...produto, [name]: type === "checkbox" ? checked : value });
  }

  return (
    <div className="container flex flex-col items-center mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-slate-800 my-6">
        {id ? "Editar" : "Cadastrar"} Produto
      </h1>

      <form
        className="w-full md:w-1/2 flex flex-col gap-4"
        onSubmit={(e) => { e.preventDefault(); navigate("/produtos"); }}
      >
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

        <label className="flex items-center gap-2 text-slate-700 font-medium">
          <input
            type="checkbox"
            name="disponivel"
            checked={produto.disponivel}
            onChange={atualizarEstado}
          />
          Disponível
        </label>

        <label className="flex items-center gap-2 text-slate-700 font-medium">
          <input
            type="checkbox"
            name="saudavel"
            checked={produto.saudavel}
            onChange={atualizarEstado}
          />
          Saudável
        </label>

        <button
          className="rounded-full text-white bg-red-400 hover:bg-red-500 py-3 font-bold transition-all"
          type="submit"
        >
          {id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;