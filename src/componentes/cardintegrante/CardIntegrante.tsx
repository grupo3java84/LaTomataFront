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
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-[#FDFBF7] text-center hover:shadow-xl transition-shadow">

      {/* Foto do Integrante - Fundo em tom cream */}
      <div className="w-40 h-40 bg-[#FDFBF7] rounded-2xl mx-auto mb-4 overflow-hidden border-4 border-[#fff9ed] aspect-square flex items-center justify-center">
        <img
          src={membro.foto}
          alt={membro.nome}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Nome e Cargo - Usando cor Nature para elegância */}
      <h3 className="font-bold text-xl text-[#2E3A23]">{membro.nome}</h3>
      <p className="text-[#1F1615] mb-6 text-sm opacity-70">{membro.papel}</p>

      {/* Ícones de Redes Sociais - Paleta Personalizada */}
      <div className="flex justify-center gap-4">
        {/* LinkedIn: Fundo claro com sombra, hover no vermelho da paleta */}
        <a
          href={membro.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-[#FDFBF7] shadow-sm border border-gray-100 rounded-full text-[#9e0000] hover:bg-[#9e0000] hover:text-white transition-all hover:shadow-md"
        >
          <LinkedinLogoIcon size={20} />
        </a>

        {/* GitHub: Fundo claro com sombra, hover no tom Nature da paleta */}
        <a
          href={membro.github}
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-[#FDFBF7] shadow-sm border border-gray-100 rounded-full text-[#2E3A23] hover:bg-[#2E3A23] hover:text-white transition-all hover:shadow-md"
        >
          <GithubLogoIcon size={20} />
        </a>
      </div>
    </div>
  );
}