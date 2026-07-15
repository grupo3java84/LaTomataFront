import { useState, type ChangeEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { atualizarCategoria, cadastrarCategoria, listarCategorias } from "../../../services/Service";

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    async function obterCategoriaPorId(id: string) {
        try {
            await listarCategorias((dados: Categoria[]) => {
                const categoriaEncontrada = dados.find((c) => c.id === Number(id));
                if (categoriaEncontrada) {
                    setCategoria(categoriaEncontrada);
                } else {
                    alert('Categoria não encontrada!');
                    retornar();
                }
            }, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            obterCategoriaPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({ 
            ...categoria, 
            [e.target.name]: e.target.value 
        });
    }

    async function processarEnvio(e: React.FormEvent) {
        e.preventDefault();

        if (id !== undefined) {
            try {
                await atualizarCategoria(categoria, setCategoria, {
                    headers: { 'Authorization': token }
                });
                alert('Categoria atualizada com sucesso!');
                retornar();
            } catch (error: any) {
                const status = error.response?.status;
                const detalheErro = error.response?.data?.mensagem || error.response?.data?.message || error.message;

                if (status === 401 || status === 403) {
                    alert('Sessão expirada ou acesso negado. Faça login novamente.');
                    handleLogout();
                } else {
                    alert(`Erro ao atualizar a Categoria: ${detalheErro}`);
                }
            }
        } else {
            try {
                await cadastrarCategoria(categoria, setCategoria, {
                    headers: { 'Authorization': token }
                });
                alert('Categoria cadastrada com sucesso!');
                retornar();
            } catch (error: any) {
                const status = error.response?.status;
                const detalheErro = error.response?.data?.mensagem || error.response?.data?.message || error.message;

                if (status === 401 || status === 403) {
                    alert('Sessão expirada ou acesso negado. Faça login novamente.');
                    handleLogout();
                } else {
                    alert(`Erro ao cadastrar a Categoria: ${detalheErro}`);
                }
            }
        }
    }

    function retornar() {
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
                        value={categoria.descricao || ''}
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