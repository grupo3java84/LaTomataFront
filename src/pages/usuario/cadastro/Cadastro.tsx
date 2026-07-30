import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../../models/Usuario";
import { cadastrarUsuario } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function Cadastro() {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (usuario.id !== 0) {
            ToastAlerta("Usuário cadastrado com sucesso!", 'sucesso');
            navigate('/');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        if (name === "email") {
            const tipo = value.endsWith("@latomata.com.br") ? "FUNCIONARIO" : "CLIENTE";
            setUsuario(prev => ({ ...prev, email: value, tipo }));
            return;
        }

        setUsuario(prev => ({ ...prev, [name]: value }));
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
            alert("Senhas divergentes!");
            return;
        }

        setIsLoading(true);

        const usuarioParaEnvio = {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            foto: usuario.foto,
            tipo: usuario.tipo,
            endereco: usuario.endereco
        };

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuarioParaEnvio, setUsuario);
        } catch (error) {
            ToastAlerta('Erro ao cadastrar. Verifique se o e-mail já está em uso.', 'error');
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fffdf9] text-[#4a3b32] font-mono flex items-center justify-center py-12 px-4 selection:bg-[#b33939] selection:text-white relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_15px,#fff_15px,#fff_30px)] opacity-20"></div>

            <div className="bg-white w-full max-w-lg p-8 md:p-10 border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] relative">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-[#2b5c40] tracking-tight">Criar conta</h2>
                    <p className="text-xs font-bold text-[#4a3b32]/70 uppercase tracking-widest mt-2">Junte-se à LaTomata</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={cadastrarNovoUsuario}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Nome</label>
                        <input type="text" name="nome" required className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Email</label>
                        <input type="email" name="email" required className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Foto (URL)</label>
                        <input type="text" name="foto" className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Endereço</label>
                        <input type="text" name="endereco" className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" onChange={atualizarEstado} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            required
                            className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs"
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            required
                            className={`border-2 ${erroSenha ? 'border-[#b33939]' : 'border-[#2b5c40]'} bg-[#fffdf9] rounded-none p-3.5 outline-none font-bold text-xs`}
                            onChange={handleConfirmarSenha}
                        />
                        {erroSenha && (
                            <span className="text-[#b33939] text-xs font-black mt-1 uppercase">
                                {erroSenha}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button type="button" onClick={() => navigate('/')} className="w-1/2 py-4 rounded-none border-2 border-[#4a3b32] bg-[#f4ebe1] hover:bg-[#eae0d2] text-[#4a3b32] font-black uppercase text-xs tracking-widest transition-all shadow-[3px_3px_0px_#4a3b32]">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading} className="w-1/2 py-4 rounded-none border-2 border-[#2b5c40] bg-[#b33939] hover:bg-[#9c2e2e] text-white font-black uppercase text-xs tracking-widest transition-all shadow-[3px_3px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 flex justify-center items-center">
                            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;