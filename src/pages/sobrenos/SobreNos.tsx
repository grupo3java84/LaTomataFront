import { integrantes } from '../../data/membros';
import { CardIntegrante } from '../../componentes/cardintegrante/CardIntegrante';

export default function SobreNos() {
    return (
        <div className="container mx-auto my-12 px-6">

            {/* Seção 1: Intro */}
            <section className="mb-20 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-black text-slate-800">A LaTomata</h1>

                <p className="mt-6 text-lg text-slate-600 text-justify">
                    A LaTomata é uma plataforma de delivery de alimentos saudáveis desenvolvida para proporcionar uma experiência simples, intuitiva e eficiente na realização de pedidos online, tornando a busca por uma alimentação saudável mais prática e acessível.
                    <br /><br />
                    Desenvolvido como projeto integrador da Generation Brasil, o sistema reúne funcionalidades de um ambiente Full Stack, contemplando o gerenciamento de categorias e produtos, autenticação de usuários e integração entre front-end e back-end. Mais do que um exercício técnico, a LaTomata representa a aplicação de boas práticas de desenvolvimento, trabalho colaborativo e a construção de uma solução voltada para a experiência do usuário.
                </p>
            </section>

            {/* Seção 2: Depoimentos */}
            <section className="mb-20 bg-[#FDFBF7] p-8 rounded-3xl border border-[#FAA935]/20">
                <h2 className="text-2xl font-bold text-center mb-10 text-[#2E3A23]">
                    Nossa Trajetória na Generation Brasil
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrantes.map((membro, index) => (
                        <div
                            key={membro.id}
                            className={`bg-white p-6 rounded-2xl border border-[#FDFBF7] shadow-sm 
          ${index === integrantes.length - 1 && integrantes.length % 2 !== 0
                                    ? 'md:col-span-2 max-w-2xl mx-auto w-full'
                                    : ''
                                }`}
                        >
                            <p className="italic text-[#1F1615]">"{membro.depoimento}"</p>
                            <span className="block mt-4 font-bold text-[#9e0000]">— {membro.nome}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção 3: Integrantes (Usando o componente reutilizável) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {integrantes.map((membro, index) => (
                    <div
                        key={membro.id}
                        // Se for o último (index 6), no desktop (lg) ele começa na coluna 2
                        className={`${index === integrantes.length - 1 ? 'lg:col-start-2' : ''}`}
                    >
                        <CardIntegrante membro={membro} />
                    </div>
                ))}
            </section>

            {/* Bloco de Parceria */}
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
                        href="https://github.com/Projeto-Integrador-G-3-J-84-Modelo/Front-LaTomata"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-[#5e930e] hover:bg-[#e67e22] text-[#FDFBF7] font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
                    >
                        Ver Código no GitHub
                    </a>
                </div>
            </section>

        </div>
    );
}