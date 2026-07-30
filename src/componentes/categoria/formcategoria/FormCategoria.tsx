import { useState, type ChangeEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { get, post } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        descricao: '',
        produto: null
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function buscarPorId(id: string) {
        try {
            await get(`/categorias/${id}`, setCategoria, {
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
            ToastAlerta('Você precisa estar logado', 'info');
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

        try {
            if (id !== undefined) {
                const dadosAtualizacao = { id: Number(id), descricao: categoria.descricao };
                await post(`/categorias/cadastrar`, dadosAtualizacao, setCategoria, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Categoria atualizada com sucesso!', 'sucesso');
            } else {
                const dadosCadastro = { descricao: categoria.descricao };
                await post(`/categorias/cadastrar`, dadosCadastro, setCategoria, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso');
            }
            retornar();
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao processar a Categoria.', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4 font-mono text-[#4a3b32]">
            <div className="w-full max-w-sm bg-white rounded-none shadow-[6px_6px_0px_#2b5c40] border-4 border-[#2b5c40] overflow-hidden">

                <div className="bg-[#b33939] py-4 px-8 text-white font-black text-sm uppercase tracking-widest text-center border-b-4 border-[#2b5c40]">
                    {id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                </div>

                <form className="flex flex-col" onSubmit={gerarNovaCategoria}>
                    <div className="p-8 flex flex-col gap-6 bg-[#fffdf9]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="descricao" className="text-[#4a3b32]/70 text-[10px] font-black uppercase tracking-widest">
                                Descrição da Categoria
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Frutas, Vegetais..."
                                name="descricao"
                                id="descricao"
                                className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 w-full font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#b33939]"
                                value={categoria.descricao}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex border-t-4 border-[#2b5c40] bg-[#fffdf9]">
                        <button
                            type="button"
                            className="w-full py-4 text-[#4a3b32] hover:bg-[#f4ebe1] font-black text-xs uppercase tracking-widest transition-all border-r-4 border-[#2b5c40]"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 text-white bg-[#b33939] hover:bg-[#9c2e2e] font-black text-xs uppercase tracking-widest transition-all flex justify-center items-center"
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={20} />
                            ) : (
                                id ? 'Atualizar' : 'Cadastrar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormCategoria;