import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, X, Check, Mail, MapPin, ShoppingBag, ShieldCheck, Camera, Package, KeyRound } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { get, put } from "../../services/Service";
import type Usuario from "../../models/Usuario";
import { ToastAlerta } from "../../utils/ToastAlerta";
import CarregandoPixel from "../../componentes/loader/CarregandoPixel"; 

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
        badgeClasses: "text-[#2b5c40] bg-[#3b7a57]/10 border-[#2b5c40]",
        ringColor: "#2b5c40",
        accentText: "text-[#2b5c40]",
        icon: ShoppingBag,
        contexto: "Cliente LaTomata",
    },
    FUNCIONARIO: {
        label: "Funcionário",
        badgeClasses: "text-[#b33939] bg-[#b33939]/10 border-[#b33939]",
        ringColor: "#b33939",
        accentText: "text-[#b33939]",
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
                ToastAlerta("Erro ao carregar perfil.", 'error');
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
            ToastAlerta("Perfil atualizado com sucesso!", 'sucesso');
            setEditando(false);
            setAlterarSenha(false);
            setConfirmarSenha("");
        } catch {
            ToastAlerta("Erro ao atualizar perfil.", 'error');
        }
        setIsLoading(false);
    }

    if (isFetching) {
        return (
            <div className="min-h-screen bg-[#fffdf9] flex items-center justify-center font-mono">
                {/* 2. Substituído o ClipLoader pelo CarregandoPixel no carregamento inicial */}
                <CarregandoPixel />
            </div>
        );
    }

    const role = ROLE_CONFIG[usuario.tipo] ?? ROLE_CONFIG.CLIENTE;
    const RoleIcon = role.icon;

    const produtos = usuario.produto ?? [];
    const totalProdutos = produtos.length;

    return (
        <div className="min-h-screen bg-[#fffdf9] text-[#4a3b32] py-12 px-4 font-mono selection:bg-[#b33939] selection:text-white relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_15px,#fff_15px,#fff_30px)] opacity-20"></div>

            <div className="max-w-4xl mx-auto">

                <p className="text-xs font-black text-[#4a3b32]/60 uppercase tracking-[0.2em] mb-4 px-1">
                    Minha Conta / Perfil
                </p>

                <div className="relative rounded-none overflow-hidden border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] bg-white">
                    <div
                        className="h-56 bg-[#b33939] relative border-b-4 border-[#2b5c40]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 40%), repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 10px, transparent 10px, transparent 20px)",
                        }}
                    />

                    <div className="absolute top-24 left-1/2 -translate-x-1/2 group">
                        {usuario.foto && !fotoError ? (
                            <img
                                src={usuario.foto}
                                alt={usuario.nome}
                                className="w-36 h-36 rounded-none object-cover border-4 border-[#fffdf9] shadow-[4px_4px_0px_#2b5c40] [image-rendering:pixelated]"
                                style={{ boxShadow: `4px 4px 0px #2b5c40` }}
                                onError={() => setFotoError(true)}
                            />
                        ) : (
                            <div
                                className="w-36 h-36 rounded-none bg-[#2b5c40] border-4 border-[#fffdf9] shadow-[4px_4px_0px_#2b5c40] flex items-center justify-center"
                            >
                                <span className="text-[#fffdf9] text-5xl font-black">
                                    {usuario.nome?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {!editando && (
                            <button
                                onClick={() => setEditando(true)}
                                title="Alterar foto"
                                className="absolute bottom-1 right-1 w-10 h-10 rounded-none bg-[#fffdf9] shadow-[2px_2px_0px_#2b5c40] border-2 border-[#2b5c40] flex items-center justify-center text-[#4a3b32] hover:text-[#b33939] hover:border-[#b33939] transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Camera size={18} />
                            </button>
                        )}
                    </div>

                    <div className="pt-28 pb-10 text-center">
                        <h1 className="text-3xl font-black text-[#2b5c40] tracking-tight">{usuario.nome}</h1>
                        <div className="flex items-center justify-center gap-1.5 mt-3">
                            <span
                                className={`inline-flex items-center gap-1.5 text-xs font-black rounded-none px-4 py-1.5 border-2 ${role.badgeClasses} shadow-[2px_2px_0px_#2b5c40] uppercase tracking-wider`}
                            >
                                <RoleIcon size={14} />
                                {role.label}
                            </span>
                        </div>
                        <p className={`text-xs font-black mt-2 uppercase tracking-wide ${role.accentText}`}>{role.contexto}</p>
                    </div>
                </div>

                {!editando ? (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-white rounded-none border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] p-8 transition-transform">
                            <h2 className="text-xs font-black text-[#2b5c40] uppercase tracking-widest mb-6 border-b-2 border-dashed border-[#d8c5b2] pb-2">Informações Pessoais</h2>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-none bg-[#3b7a57]/10 border-2 border-[#3b7a57] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#3b7a57]">
                                        <Mail size={20} className="text-[#3b7a57]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#4a3b32]/60 font-black uppercase tracking-wider">Email</p>
                                        <p className="text-sm text-[#4a3b32] font-bold">{usuario.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-none bg-[#3b7a57]/10 border-2 border-[#3b7a57] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#3b7a57]">
                                        <MapPin size={20} className="text-[#3b7a57]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#4a3b32]/60 font-black uppercase tracking-wider">
                                            {usuario.tipo === "CLIENTE" ? "Endereço de entrega" : "Endereço"}
                                        </p>
                                        <p className="text-sm text-[#4a3b32] font-bold">{usuario.endereco || "—"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-none border-4 border-[#b33939] shadow-[6px_6px_0px_#b33939] p-8 flex flex-col gap-4 justify-center transition-transform">
                            <h2 className="text-xs font-black text-[#b33939] uppercase tracking-widest mb-2 border-b-2 border-dashed border-[#d8c5b2] pb-2">Conta</h2>
                            <button
                                onClick={() => setEditando(true)}
                                className="w-full py-4 rounded-none border-2 border-[#2b5c40] bg-[#fffdf9] text-[#2b5c40] hover:bg-[#2b5c40] hover:text-white font-black uppercase text-xs tracking-widest transition-all shadow-[3px_3px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Pencil size={18} />
                                Editar perfil
                            </button>
                            <button
                                onClick={() => { handleLogout(); navigate("/login"); }}
                                className="w-full py-4 rounded-none border-2 border-[#b33939] bg-[#b33939] text-white hover:bg-[#9c2e2e] font-black uppercase text-xs tracking-widest transition-all shadow-[3px_3px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5"
                            >
                                Sair da conta
                            </button>
                        </div>

                        {usuario.tipo === "FUNCIONARIO" && totalProdutos > 0 && (
                            <div className="md:col-span-2 bg-white rounded-none border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] p-8 transition-transform">
                                <h2 className="text-xs font-black text-[#2b5c40] uppercase tracking-widest mb-6 border-b-2 border-dashed border-[#d8c5b2] pb-2">
                                    Meus Produtos Cadastrados
                                </h2>
                                <div className="flex gap-5 overflow-x-auto pb-2">
                                    {produtos.map((p) => (
                                        <div key={p.id} className="shrink-0 w-32 text-center">
                                            <div className="relative w-32 h-32 rounded-none overflow-hidden bg-[#f4ebe1] border-2 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40]">
                                                {p.foto ? (
                                                    <img
                                                        src={p.foto}
                                                        alt={p.nome}
                                                        className="w-full h-full object-cover [image-rendering:pixelated]"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package size={24} className="text-[#4a3b32]/40" />
                                                    </div>
                                                )}
                                                {!p.disponivel && (
                                                    <span className="absolute inset-x-0 bottom-0 bg-[#b33939] text-white text-[9px] font-black py-1 text-center uppercase tracking-wider">
                                                        Indisponível
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs font-black text-[#4a3b32] mt-2 truncate" title={p.nome}>
                                                {p.nome}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                ) : (
                    <div className="mt-8 bg-white rounded-none border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] p-8">
                        <h2 className="text-xs font-black text-[#2b5c40] uppercase tracking-widest mb-8 border-b-2 border-dashed border-[#d8c5b2] pb-2">Editar Perfil</h2>

                        <p className="text-xs font-black text-[#b33939] uppercase tracking-widest mb-4">Dados pessoais</p>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Nome</label>
                                <input type="text" name="nome" value={usuario.nome} onChange={atualizarEstado}
                                    className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Email</label>
                                <input type="email" name="email" value={usuario.email} onChange={atualizarEstado}
                                    className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Foto (URL)</label>
                                <input type="text" name="foto" value={usuario.foto} onChange={atualizarEstado}
                                    className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">
                                    {usuario.tipo === "CLIENTE" ? "Endereço de entrega" : "Endereço"}
                                </label>
                                <input type="text" name="endereco" value={usuario.endereco} onChange={atualizarEstado}
                                    className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" />
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-[#d8c5b2] my-8" />

                        <button
                            type="button"
                            onClick={() => { setAlterarSenha(!alterarSenha); setConfirmarSenha(""); setErroSenha(""); }}
                            className={`w-full py-4 rounded-none border-2 font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_#2b5c40] ${alterarSenha
                                ? "border-[#b33939] text-[#b33939] bg-[#b33939]/10"
                                : "border-[#2b5c40] text-[#2b5c40] bg-[#fffdf9] hover:bg-[#2b5c40] hover:text-white"
                            }`}
                        >
                            <KeyRound size={18} />
                            {alterarSenha ? "Cancelar alteração de senha" : "Alterar senha"}
                        </button>

                        {alterarSenha && (
                            <div className="flex flex-col gap-5 mt-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Nova Senha</label>
                                    <input type="password" name="senha" placeholder="••••••••" onChange={atualizarEstado}
                                        className="border-2 border-[#2b5c40] bg-[#fffdf9] rounded-none p-3.5 focus:outline-none focus:ring-2 focus:ring-[#b33939] font-bold text-xs" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-[#4a3b32]/70 uppercase tracking-widest">Confirmar Nova Senha</label>
                                    <input type="password" placeholder="••••••••" value={confirmarSenha} onChange={handleConfirmarSenha}
                                        className={`border-2 ${erroSenha ? 'border-[#b33939]' : 'border-[#2b5c40]'} bg-[#fffdf9] rounded-none p-3.5 outline-none font-bold text-xs`} />
                                    {erroSenha && <span className="text-[#b33939] text-xs font-black mt-1 uppercase">{erroSenha}</span>}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 mt-8">
                            <button onClick={cancelarEdicao}
                                className="w-1/2 py-4 rounded-none border-2 border-[#4a3b32] bg-[#f4ebe1] hover:bg-[#eae0d2] text-[#4a3b32] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_#4a3b32]">
                                <X size={18} /> Cancelar
                            </button>
                            <button onClick={salvarPerfil} disabled={isLoading}
                                className="w-1/2 py-4 rounded-none border-2 border-[#2b5c40] bg-[#b33939] hover:bg-[#9c2e2e] text-white font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_#2b5c40] disabled:opacity-70">
                                {/* Substituído o ClipLoader do botão de salvamento por uma versão compacta ou texto alternativo */}
                                {isLoading ? (
                                    <img
                                        src="./TomatoCut.png"
                                        alt="Salvando..."
                                        className="w-5 h-5 [image-rendering:pixelated] animate-spin [animation-duration:2s]"
                                    />
                                ) : (
                                    <><Check size={18} /> Salvar</>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Perfil;