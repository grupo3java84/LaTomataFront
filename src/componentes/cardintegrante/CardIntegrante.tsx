import { LinkedinLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';

interface MembroProps {
    membro: {
        nome: string;
        papel: string;
        foto: string;
        linkedin: string;
        github: string;
    };
}

export function CardIntegrante({ membro }: MembroProps) {
    return (
        <div className="bg-white p-6 rounded-none border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] text-center transition-transform hover:-translate-y-1">

            <div className="w-36 h-36 bg-[#fffdf9] rounded-none mx-auto mb-5 overflow-hidden border-2 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40] aspect-square flex items-center justify-center">
                <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <h3 className="font-black text-lg text-[#2b5c40] tracking-tight">{membro.nome}</h3>
            <p className="text-[#4a3b32] mb-6 text-xs font-bold uppercase tracking-wider opacity-80">{membro.papel}</p>

            <div className="flex justify-center gap-3">
                <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#fffdf9] border-2 border-[#2b5c40] rounded-none text-[#b33939] hover:bg-[#b33939] hover:text-white transition-all shadow-[2px_2px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5"
                    title="LinkedIn"
                >
                    <LinkedinLogoIcon size={20} weight="bold" />
                </a>

                <a
                    href={membro.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#fffdf9] border-2 border-[#2b5c40] rounded-none text-[#2b5c40] hover:bg-[#2b5c40] hover:text-white transition-all shadow-[2px_2px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5"
                    title="GitHub"
                >
                    <GithubLogoIcon size={20} weight="bold" />
                </a>
            </div>
        </div>
    );
}