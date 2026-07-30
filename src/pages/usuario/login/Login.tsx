import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type UsuarioLogin from "../../../models/UsuarioLogin";

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        foto: '',
        token: ''
    });

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="min-h-screen bg-[#fffdf9] text-[#4a3b32] font-mono flex items-center justify-center p-4 selection:bg-[#b33939] selection:text-white relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_15px,#fff_15px,#fff_30px)] opacity-20"></div>

            <div className="bg-white w-full max-w-sm p-8 md:p-10 border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40]">

                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-[#2b5c40] tracking-tight">Bem-vindo</h2>
                    <p className="text-xs font-bold text-[#4a3b32]/70 uppercase tracking-widest mt-2">Acesse sua conta LaTomata.</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={login}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="exemplo@email.com"
                            className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs"
                            value={usuarioLogin.email}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="********"
                            className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs"
                            value={usuarioLogin.senha}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading} 
                        className={`w-full py-4 rounded-none border-2 border-[#2b5c40] bg-[#b33939] text-white font-black uppercase text-xs tracking-widest transition-all shadow-[3px_3px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 flex justify-center items-center ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#9c2e2e]"
                            }`}
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Entrar"}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-xs font-bold text-[#4a3b32]/80">
                            Ainda não tem conta?{' '}
                            <Link to="/cadastro" className="text-[#3b7a57] font-black underline hover:text-[#2b5c40]">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;