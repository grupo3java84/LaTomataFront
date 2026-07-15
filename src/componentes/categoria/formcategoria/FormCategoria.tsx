import { useState, type ChangeEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { get, post, put } from "../../../services/Service";

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function buscarPorId(id: string) {
        try {
            await get(`/categorias/${id}`, setCategoria, {
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
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate("/categorias");
    }

    async function gerarNovaCategoria(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await put(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                });
                alert('Categoria atualizada com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar a Categoria.');
                }
            }
        } else {
            try {
                await post(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                });
                alert('Categoria cadastrada com sucesso!');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar a Categoria.');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-8 px-4">
            <h1 className="text-4xl text-center my-8 font-bold text-slate-800">
                {id ? 'Editar' : 'Cadastrar'} Categoria
            </h1>

            <form className="w-full md:w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-slate-700 font-semibold">
                        Nome da Categoria
                    </label>
                    <input
                        type="text"
                        placeholder="Descreva aqui sua categoria"
                        name="nome"
                        id="nome"
                        className="border-2 border-red-200 rounded-xl p-3 w-full focus:border-red-400 outline-none transition-all"
                        value={categoria.nome || ''}
                        onChange={atualizarEstado}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-full text-white bg-red-400 hover:bg-red-500 py-3 font-bold transition-all w-full md:w-1/2 mx-auto flex justify-center"
                >
                    {isLoading ? <ClipLoader color="white" size={16} /> : (id ? 'Atualizar' : 'Cadastrar')}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;