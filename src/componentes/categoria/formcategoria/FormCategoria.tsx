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
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
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
        <div className="container flex flex-col items-center justify-center mx-auto my-12 px-4">
            {/* Card do Formulário */}
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">

                {/* Faixa Vermelha de Título */}
                <div className="bg-[#9e0000] py-4 px-8 text-white font-bold text-lg uppercase tracking-widest text-center">
                    {id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                </div>

                {/* Área do Formulário */}
                <form className="flex flex-col" onSubmit={gerarNovaCategoria}>
                    {/* Área de Input com padding */}
                    <div className="p-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="descricao" className="text-slate-600 text-sm font-bold">
                                Descrição da Categoria
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Frutas, Vegetais..."
                                name="descricao"
                                id="descricao"
                                className="border-2 border-slate-200 rounded-xl p-3 w-full focus:border-[#9e0000] outline-none transition-all"
                                value={categoria.descricao}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>
                    </div>

                    {/* Área de Botões (Rodapé) */}
                    <div className="flex border-t border-slate-100">
                        <button
                            type="button"
                            className="w-full py-4 text-slate-500 hover:bg-slate-50 font-bold transition-all border-r border-slate-100"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 text-[#9e0000] hover:bg-red-50 font-bold transition-all flex justify-center items-center"
                        >
                            {isLoading ? (
                                <ClipLoader color="#9e0000" size={20} />
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