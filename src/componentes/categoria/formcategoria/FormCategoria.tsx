import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categoria, setCategoria] = useState({ descricao: '' });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({ 
            ...categoria, 
            [e.target.name]: e.target.value 
        });
    }

    function processarEnvio(e: React.FormEvent) {
        e.preventDefault();
        navigate("/categorias");
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-8 px-4">
            <h1 className="text-4xl text-center my-8 font-bold text-slate-800">
                {id ? 'Editar' : 'Cadastrar'} Categoria
            </h1>

            <form className="w-full md:w-1/2 flex flex-col gap-4" onSubmit={processarEnvio}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="text-slate-700 font-semibold">
                        Descrição da Categoria
                    </label>
                    <input
                        type="text"
                        placeholder="Descreva aqui sua categoria"
                        name="descricao"
                        id="descricao"
                        className="border-2 border-red-200 rounded-xl p-3 w-full focus:border-red-400 outline-none transition-all"
                        value={categoria.descricao}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="rounded-full text-white bg-red-400 hover:bg-red-500 py-3 font-bold transition-all w-full md:w-1/2 mx-auto flex justify-center"
                >
                    {id ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;