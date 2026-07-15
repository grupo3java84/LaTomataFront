import { integrantes } from '../../data/membros';
import { CardIntegrante } from '../../componentes/cardintegrante/CardIntegrante';
export default function SobreNos() {
    return (
        <div className="container mx-auto my-12 px-6">

            {/* Seção 1: Intro */}
            <section className="text-center mb-20 max-w-3xl mx-auto">
                <h1 className="text-4xl font-black text-slate-800">A LaTomata</h1>
                <p className="text-slate-600 mt-6 text-lg">O sistema LaTomata é um projeto Full Stack desenvolvido como parte integrante da nossa jornada na Generation Brasil. Nosso objetivo foi construir um marketplace de delivery de comida saudável funcional, contemplando desde a gestão de categorias e produtos até um front-end dinâmico e responsivo. Este projeto reflete nosso aprendizado técnico em Java, Spring Boot e React, além da nossa dedicação em criar soluções digitais que priorizam a saúde e a experiência do cliente.</p>
            </section>

            {/* Seção 2: Depoimentos */}
            <section className="mb-20 bg-[#FDFBF7] p-8 rounded-3xl border border-[#FAA935]/20">
                <h2 className="text-2xl font-bold text-center mb-10 text-[#2E3A23]">
                    Nossa Jornada na Generation
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrantes.map((membro) => (
                        <div key={membro.id} className="bg-white p-6 rounded-2xl border border-[#FDFBF7] shadow-sm">
                            <p className="italic text-[#1F1615]">"{membro.depoimento}"</p>
                            <span className="block mt-4 font-bold text-[#9e0000]">— {membro.nome}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção 3: Integrantes (Usando o componente reutilizável) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {integrantes.map((membro) => (
                    <CardIntegrante key={membro.id} membro={membro} />
                ))}
            </section>

            {/* Bloco de Parceria - Separado do Footer */}
            <section className="mt-24 py-12 border-t border-slate-200">
                <h4 className="text-center font-bold text-slate-500 mb-8 uppercase tracking-widest text-sm">
                    Projeto Integrador realizado durante a Turma 84 | Java Full Stack
                </h4>

                <div className="flex flex-col md:flex-row justify-center items-center gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">

                    {/* Link para a Generation Brasil */}
                    <a href="https://brasil.generation.org/" target="_blank" rel="noreferrer" className="transition-transform hover:scale-105">
                        <img src="./assets/empresas/generation.png" alt="Generation Brasil" className="h-16" />
                    </a>

                    {/* Link para a SumUp */}
                    <a href="https://www.sumup.com.br/" target="_blank" rel="noreferrer" className="transition-transform hover:scale-105">
                        <img src="./assets/empresas/sumup.png" alt="SumUp" className="h-16" />
                    </a>

                </div>

                <div className="flex justify-center items-center w-full mt-12">
    <a
        href="https://github.com/grupo3java84/LaTomataFront"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#80c31b] hover:bg-[#5e930e] text-[#FDFBF7] font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
    >
        Ver Código no GitHub
    </a>
</div>
            </section>

        </div>
    );
}