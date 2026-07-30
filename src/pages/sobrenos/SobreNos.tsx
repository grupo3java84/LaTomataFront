import { integrantes } from '../../data/membros';
import { CardIntegrante } from '../../componentes/cardintegrante/CardIntegrante';

export default function SobreNos() {
    return (
        <div className="bg-[#fffdf9] text-[#4a3b32] min-h-screen font-mono selection:bg-[#b33939] selection:text-white relative overflow-hidden py-12 px-6">

            <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_15px,#fff_15px,#fff_30px)] opacity-20"></div>

            <div className="container mx-auto max-w-7xl">

                <section className="mb-20 max-w-4xl mx-auto text-center bg-white p-8 md:p-12 border-4 border-[#2b5c40] shadow-[6px_6px_0px_#2b5c40] relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 border-4 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40] flex items-center justify-center">
                        <img
                            src="./TomatoCut.png"
                            alt="Logo LaTomata"
                            className="w-10 h-10 [image-rendering:pixelated] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#2b5c40] mt-4 tracking-tight">A LaTomata</h1>

                    <p className="mt-6 text-sm md:text-base text-[#4a3b32]/90 text-justify leading-relaxed font-bold">
                        A LaTomata é uma plataforma de delivery de alimentos saudáveis desenvolvida para proporcionar uma experiência simples, intuitiva e eficiente na realização de pedidos online, tornando a busca por uma alimentação saudável mais prática e acessível.
                        <br /><br />
                        Desenvolvido como projeto integrador da Generation Brasil, o sistema reúne funcionalidades de um ambiente Full Stack, contemplando o gerenciamento de categorias e produtos, autenticação de usuários e integração entre front-end e back-end. Mais do que um exercício técnico, a LaTomata representa a aplicação de boas práticas de desenvolvimento, trabalho colaborativo e a construção de uma solução voltada para a experiência do usuário.
                    </p>
                </section>

                <section className="mb-20 bg-[#fcf8f2] p-8 md:p-12 border-4 border-[#3b7a57] shadow-[6px_6px_0px_#3b7a57]">
                    <h2 className="text-2xl md:text-3xl font-black text-center mb-12 text-[#2b5c40] uppercase tracking-tight">
                        Nossa Trajetória na Generation Brasil
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {integrantes.map((membro, index) => (
                            <div
                                key={membro.id}
                                className={`bg-white p-6 border-2 border-[#2b5c40] shadow-[4px_4px_0px_#2b5c40] flex flex-col justify-between 
         ${index === integrantes.length - 1 && integrantes.length % 2 !== 0
                                        ? 'md:col-span-2 max-w-2xl mx-auto w-full'
                                        : ''
                                    }`}
                            >
                                <p className="italic text-[#4a3b32] font-bold text-xs md:text-sm leading-relaxed">"{membro.depoimento}"</p>
                                <span className="block mt-4 font-black text-[#b33939] text-xs uppercase tracking-wider">— {membro.nome}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {integrantes.map((membro, index) => (
                        <div
                            key={membro.id}
                            className={`${index === integrantes.length - 1 ? 'lg:col-start-2' : ''}`}
                        >
                            <CardIntegrante membro={membro} />
                        </div>
                    ))}
                </section>

                <section className="mt-24 py-12 border-t-4 border-dashed border-[#d8c5b2]">
                    <h4 className="text-center font-black text-[#2b5c40] mb-8 uppercase tracking-widest text-xs">
                        Projeto Integrador realizado pelo grupo 3 durante a Turma 84 | Java Full Stack
                    </h4>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300">

                        <a href="https://brasil.generation.org/" target="_blank" rel="noreferrer" className="transition-transform hover:scale-105 bg-white p-4 border-2 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40]">
                            <img src="./assets/empresas/generation.png" alt="Generation Brasil" className="h-12 [image-rendering:pixelated]" />
                        </a>

                        <a href="https://www.sumup.com.br/" target="_blank" rel="noreferrer" className="transition-transform hover:scale-105 bg-white p-4 border-2 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40]">
                            <img src="./assets/empresas/sumup.png" alt="SumUp" className="h-12 [image-rendering:pixelated]" />
                        </a>

                    </div>

                    <div className="flex justify-center items-center w-full mt-12">
                        <a
                            href="https://github.com/Projeto-Integrador-G-3-J-84-Modelo/Front-LaTomata"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-[#b33939] hover:bg-[#9c2e2e] text-white font-black py-4 px-8 border-2 border-[#2b5c40] uppercase text-xs tracking-widest transition-all shadow-[4px_4px_0px_#2b5c40] active:translate-x-0.5 active:translate-y-0.5 text-center"
                        >
                            Ver Código no GitHub
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
}