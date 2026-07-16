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
        <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl border border-slate-100">

                <div className="text-center mb-8">
                    <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#9e0000]">Bem-vindo</h2>
                    <p className="text-slate-500 mt-2">Acesse sua conta LaTomata.</p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={login}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="exemplo@email.com"
                            className="border border-slate-300 rounded-lg p-3 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all"
                            value={usuarioLogin.email}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="********"
                            className="border border-slate-300 rounded-lg p-3 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all"
                            value={usuarioLogin.senha}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading} 
                        className={`mt-4 w-full py-3 rounded-xl bg-[#9e0000] text-white font-bold transition-all flex justify-center ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#7a0000]"
                            }`}
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Entrar"}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-600">
                            Ainda não tem conta?{' '}
                            <Link to="/cadastro" className="text-[#2d5a27] font-bold hover:underline">
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