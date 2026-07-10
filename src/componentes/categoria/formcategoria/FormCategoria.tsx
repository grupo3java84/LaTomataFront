import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categoria, setCategoria] = useState({ descricao: '' });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    }

    return (
        <div className="container flex flex-col items-center mx-auto my-10 px-4">
            <h1 className="text-3xl font-bold text-slate-800 my-6">{id ? 'Editar' : 'Cadastrar'} Categoria</h1>
            <form className="w-full md:w-1/2 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate("/categorias"); }}>
                <input
                    type="text"
                    placeholder="Descrição da Categoria"
                    name='descricao'
                    className="border-2 border-red-200 rounded-xl p-4 w-full focus:border-red-400 outline-none"
                    value={categoria.descricao}
                    onChange={atualizarEstado}
                />
                <button className="rounded-full text-white bg-red-400 hover:bg-red-500 py-3 font-bold transition-all" type="submit">
                    {id ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}
export default FormCategoria;