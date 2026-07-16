import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Usuario from "../../../models/Usuario";
import { cadastrarUsuario } from "../../../services/Service";

function Cadastro() {
    const navigate = useNavigate();
    const { usuario: usuarioGlobal } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [erroSenha, setErroSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        foto: '',
        tipo: 'CLIENTE',
        endereco: '',
        produto: []
    });

    const isAdmin = usuarioGlobal.email === "root@root.com.br";

    useEffect(() => {
        if (usuario.id !== 0) {
            alert("Usuário cadastrado com sucesso!");
            navigate('/');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value;
        setConfirmarSenha(valor);

        if (valor !== usuario.senha) {
            setErroSenha("As senhas não coincidem!");
        } else {
            setErroSenha("");
        }
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (usuario.senha.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (confirmarSenha !== usuario.senha) {
            alert("Senhas divergentes! Verifique a confirmação.");
            return;
        }

        setIsLoading(true);
        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        } catch (error) {
            alert('Erro ao cadastrar o usuário!');
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center py-12 px-4">
            <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#9e0000] text-center mb-8">Criar conta</h2>

                <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Nome</label>
                        <input type="text" name="nome" required className="border border-slate-300 rounded-lg p-3" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Email</label>
                        <input type="email" name="email" required className="border border-slate-300 rounded-lg p-3" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Foto (URL)</label>
                        <input type="text" name="foto" className="border border-slate-300 rounded-lg p-3" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Endereço</label>
                        <input type="text" name="endereco" className="border border-slate-300 rounded-lg p-3" onChange={atualizarEstado} />
                    </div>

                    {isAdmin && (
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-[#2d5a27]">Tipo de Usuário</label>
                            <select name="tipo" className="border border-[#2d5a27] rounded-lg p-3" onChange={atualizarEstado}>
                                <option value="CLIENTE">Cliente</option>
                                <option value="FUNCIONARIO">Funcionário</option>
                            </select>
                        </div>
                    )}



                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            required
                            className="border border-slate-300 rounded-lg p-3"
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            required
                            className={`border ${erroSenha ? 'border-red-500' : 'border-slate-300'} rounded-lg p-3`}
                            onChange={handleConfirmarSenha}
                        />
        
                        {erroSenha && (
                            <span className="text-red-500 text-xs font-medium mt-1">
                                {erroSenha}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button type="button" onClick={() => navigate('/')} className="w-1/2 py-3 rounded-xl border-2 border-slate-200 hover:bg-slate-50 font-bold transition-all">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading} className="w-1/2 py-3 rounded-xl bg-[#9e0000] hover:bg-[#7a0000] text-white font-bold transition-all flex justify-center">
                            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;