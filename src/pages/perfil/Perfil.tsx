import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Pencil, X, Check, Mail, MapPin, ShoppingBag, ShieldCheck, Camera, Package, KeyRound } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { get, put } from "../../services/Service";
import type Usuario from "../../models/Usuario";

type RoleConfig = {
    label: string;
    badgeClasses: string;
    ringColor: string;
    accentText: string;
    icon: typeof ShoppingBag;
    contexto: string;
};

const ROLE_CONFIG: Record<string, RoleConfig> = {
    CLIENTE: {
        label: "Cliente",
        badgeClasses: "text-[#2d5a27] bg-green-50 border-[#2d5a27]",
        ringColor: "#2d5a27",
        accentText: "text-[#2d5a27]",
        icon: ShoppingBag,
        contexto: "Cliente LaTomata",
    },
    FUNCIONARIO: {
        label: "Funcionário",
        badgeClasses: "text-[#8a6d1f] bg-amber-50 border-[#c9a227]",
        ringColor: "#c9a227",
        accentText: "text-[#8a6d1f]",
        icon: ShieldCheck,
        contexto: "Equipe LaTomata",
    },
};

function Perfil() {
    const navigate = useNavigate();
    const { usuario: usuarioLogado, handleLogout } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [editando, setEditando] = useState(false);
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [fotoError, setFotoError] = useState(false);

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        foto: "",
        tipo: "CLIENTE",
        endereco: "",
        produto: []
    });

    const [usuarioOriginal, setUsuarioOriginal] = useState<Usuario>({ ...usuario });

    useEffect(() => {
        if (!usuarioLogado.token) navigate("/login");
    }, [usuarioLogado.token]);

    useEffect(() => {
        if (!usuarioLogado.id) return;

        async function buscarUsuario() {
            setIsFetching(true);
            try {
                await get(
                    `/usuarios/${usuarioLogado.id}`,
                    (data: Usuario) => {
                        setUsuario(data);
                        setUsuarioOriginal(data);
                        setFotoError(false);
                    },
                    { headers: { Authorization: usuarioLogado.token } }
                );
            } catch {
                alert("Erro ao carregar perfil.");
            }
            setIsFetching(false);
        }

        buscarUsuario();
    }, [usuarioLogado.id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value;
        setConfirmarSenha(valor);
        setErroSenha(valor !== usuario.senha ? "As senhas não coincidem!" : "");
    }

    function cancelarEdicao() {
        setUsuario(usuarioOriginal);
        setEditando(false);
        setAlterarSenha(false);
        setConfirmarSenha("");
        setErroSenha("");
    }

    async function salvarPerfil() {
        if (alterarSenha) {
            if (usuario.senha.length < 8) {
                alert("A senha deve ter pelo menos 8 caracteres.");
                return;
            }
            if (confirmarSenha !== usuario.senha) {
                alert("As senhas não coincidem!");
                return;
            }
        }

        const payload: Usuario = { ...usuario };
        if (!alterarSenha || !payload.senha) delete (payload as any).senha;

        setIsLoading(true);
        try {
            await put(
                `/usuarios/atualizar`,
                payload,
                (data: Usuario) => {
                    setUsuario(data);
                    setUsuarioOriginal(data);
                    setFotoError(false);
                },
                { headers: { Authorization: usuarioLogado.token } }
            );
            alert("Perfil atualizado com sucesso!");
            setEditando(false);
            setAlterarSenha(false);
            setConfirmarSenha("");
        } catch {
            alert("Erro ao atualizar perfil.");
        }
        setIsLoading(false);
    }

    if (isFetching) {
        return (
            <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
                <ClipLoader color="#9e0000" size={40} />
            </div>
        );
    }

    const role = ROLE_CONFIG[usuario.tipo] ?? ROLE_CONFIG.CLIENTE;
    const RoleIcon = role.icon;

    const produtos = usuario.produto ?? [];
    const totalProdutos = produtos.length;

    return (
        <div className="min-h-screen bg-[#fdfbf7] py-12 px-4">
            <div className="max-w-4xl mx-auto">

                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">
                    Minha Conta / Perfil
                </p>

                <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
                    <div
                        className="h-56 bg-gradient-to-r from-[#9e0000] to-[#c0392b] relative"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 40%), linear-gradient(120deg, #9e0000 0%, #c0392b 100%)",
                        }}
                    />

                    <div className="absolute top-24 left-1/2 -translate-x-1/2 group">
                        {usuario.foto && !fotoError ? (
                            <img
                                src={usuario.foto}
                                alt={usuario.nome}
                                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                                style={{ boxShadow: `0 0 0 5px ${role.ringColor}` }}
                                onError={() => setFotoError(true)}
                            />
                        ) : (
                            <div
                                className="w-36 h-36 rounded-full bg-[#7a0000] border-4 border-white shadow-lg flex items-center justify-center"
                                style={{ boxShadow: `0 0 0 5px ${role.ringColor}` }}
                            >
                                <span className="text-white text-5xl font-bold">
                                    {usuario.nome?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {!editando && (
                            <button
                                onClick={() => setEditando(true)}
                                title="Alterar foto"
                                className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#9e0000] hover:border-[#9e0000] transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Camera size={18} />
                            </button>
                        )}
                    </div>

                    <div className="pt-28 pb-10 text-center">
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-slate-800">{usuario.nome}</h1>
                        <div className="flex items-center justify-center gap-1.5 mt-3">
                            <span
                                className={`inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-4 py-1.5 border ${role.badgeClasses}`}
                            >
                                <RoleIcon size={14} />
                                {role.label}
                            </span>
                        </div>
                        <p className={`text-sm font-semibold mt-2 ${role.accentText}`}>{role.contexto}</p>
                    </div>
                </div>

                {!editando ? (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-white rounded-3xl shadow-md hover:shadow-lg p-8 border border-slate-100 transition-shadow">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Informações Pessoais</h2>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                        <Mail size={20} className="text-[#9e0000]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold">Email</p>
                                        <p className="text-base text-slate-700 font-medium">{usuario.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                        <MapPin size={20} className="text-[#9e0000]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold">
                                            {usuario.tipo === "CLIENTE" ? "Endereço de entrega" : "Endereço"}
                                        </p>
                                        <p className="text-base text-slate-700 font-medium">{usuario.endereco || "—"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-md hover:shadow-lg p-8 border border-slate-100 flex flex-col gap-4 justify-center transition-shadow">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Conta</h2>
                            <button
                                onClick={() => setEditando(true)}
                                className="w-full py-4 rounded-xl border-2 border-[#9e0000] text-[#9e0000] hover:bg-[#9e0000] hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <Pencil size={18} />
                                Editar perfil
                            </button>
                            <button
                                onClick={() => { handleLogout(); navigate("/login"); }}
                                className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 font-bold transition-all"
                            >
                                Sair da conta
                            </button>
                        </div>

                        {usuario.tipo === "FUNCIONARIO" && totalProdutos > 0 && (
                            <div className="md:col-span-2 bg-white rounded-3xl shadow-md hover:shadow-lg p-8 border border-slate-100 transition-shadow">
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                                    Meus Produtos Cadastrados
                                </h2>
                                <div className="flex gap-5 overflow-x-auto pb-1">
                                    {produtos.map((p) => (
                                        <div key={p.id} className="shrink-0 w-32 text-center">
                                            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                                                {p.foto ? (
                                                    <img
                                                        src={p.foto}
                                                        alt={p.nome}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package size={24} className="text-slate-300" />
                                                    </div>
                                                )}
                                                {!p.disponivel && (
                                                    <span className="absolute inset-x-0 bottom-0 bg-slate-800/70 text-white text-[10px] font-semibold py-1 text-center">
                                                        Indisponível
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs font-semibold text-slate-600 mt-2 truncate" title={p.nome}>
                                                {p.nome}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                ) : (
                    <div className="mt-8 bg-white rounded-3xl shadow-md p-8 border border-slate-100">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Editar Perfil</h2>

                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dados pessoais</p>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome</label>
                                <input type="text" name="nome" value={usuario.nome} onChange={atualizarEstado}
                                    className="border border-slate-300 rounded-xl p-3.5 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                                <input type="email" name="email" value={usuario.email} onChange={atualizarEstado}
                                    className="border border-slate-300 rounded-xl p-3.5 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Foto (URL)</label>
                                <input type="text" name="foto" value={usuario.foto} onChange={atualizarEstado}
                                    className="border border-slate-300 rounded-xl p-3.5 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {usuario.tipo === "CLIENTE" ? "Endereço de entrega" : "Endereço"}
                                </label>
                                <input type="text" name="endereco" value={usuario.endereco} onChange={atualizarEstado}
                                    className="border border-slate-300 rounded-xl p-3.5 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all" />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 my-8" />

                        <button
                            type="button"
                            onClick={() => { setAlterarSenha(!alterarSenha); setConfirmarSenha(""); setErroSenha(""); }}
                            className={`w-full py-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                                alterarSenha
                                    ? "border-[#9e0000] text-[#9e0000] bg-red-50"
                                    : "border-slate-200 text-slate-500 hover:border-[#9e0000] hover:text-[#9e0000]"
                            }`}
                        >
                            <KeyRound size={18} />
                            {alterarSenha ? "Cancelar alteração de senha" : "Alterar senha"}
                        </button>

                        {alterarSenha && (
                            <div className="flex flex-col gap-5 mt-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nova Senha</label>
                                    <input type="password" name="senha" placeholder="••••••••" onChange={atualizarEstado}
                                        className="border border-slate-300 rounded-xl p-3.5 focus:border-[#9e0000] focus:ring-1 focus:ring-[#9e0000] outline-none transition-all" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirmar Nova Senha</label>
                                    <input type="password" placeholder="••••••••" value={confirmarSenha} onChange={handleConfirmarSenha}
                                        className={`border ${erroSenha ? 'border-red-500' : 'border-slate-300'} rounded-xl p-3.5 outline-none transition-all`} />
                                    {erroSenha && <span className="text-red-500 text-xs font-medium mt-1">{erroSenha}</span>}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 mt-8">
                            <button onClick={cancelarEdicao}
                                className="w-1/2 py-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 font-bold transition-all flex items-center justify-center gap-2">
                                <X size={18} /> Cancelar
                            </button>
                            <button onClick={salvarPerfil} disabled={isLoading}
                                className="w-1/2 py-4 rounded-xl bg-[#9e0000] hover:bg-[#7a0000] text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <><Check size={18} /> Salvar</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Perfil;