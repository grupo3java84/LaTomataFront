import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarregandoPixel from '../../componentes/loader/CarregandoPixel'; 

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#fffdf9] min-h-screen flex items-center justify-center">
        <CarregandoPixel />
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf9] text-[#4a3b32] min-h-screen font-mono selection:bg-[#b33939] selection:text-white relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#3b7a57,#3b7a57_15px,#fff_15px,#fff_30px)] opacity-20"></div>

      <main className="max-w-5xl mx-auto px-8 pb-20">

        <section className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16 relative space-y-8">
          <div className="inline-block bg-[#b33939]/10 text-[#b33939] px-4 py-1.5 border-2 border-[#b33939]/30 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#b33939]">
            O seu piquenique gourmet favorito
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#2b5c40] leading-tight tracking-tight drop-shadow-[1px_1px_0px_#000] max-w-3xl">
            Comer ao ar livre é <br />
            <span className="text-[#b33939] italic underline decoration-wavy decoration-2">um abraço na alma.</span>
          </h1>

          <p className="text-sm md:text-base text-[#4a3b32]/90 max-w-xl leading-relaxed font-bold">
            Levamos a leveza de um dia no parque direto para a sua porta. Pratos frescos e deliciosos, sem o trabalho de carregar a cesta ou espantar as formigas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link 
              to="/produtos" 
              className="bg-[#b33939] text-white px-8 py-4 font-black uppercase text-xs tracking-widest border-2 border-[#2b5c40] shadow-[3px_3px_0px_#2b5c40] hover:bg-[#9c2e2e] transition-all transform hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 text-center"
            >
               Ver Cardápio
            </Link>
            <Link 
              to="/categorias" 
              className="bg-[#f4ebe1] text-[#4a3b32] px-8 py-4 font-black uppercase text-xs tracking-widest border-2 border-[#d8c5b2] shadow-[3px_3px_0px_#d8c5b2] hover:bg-[#eae0d2] transition-all transform hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 text-center"
            >
              Ver Categorias
            </Link>
          </div>
        </section>

        <section className="py-20 border-t-4 border-dashed border-[#d8c5b2]/60">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-16 text-[#2b5c40] uppercase tracking-tight">Sua cesta em 3 passos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Escolha o cardápio", desc: "Do leve e fresco ao aconchegante." },
              { num: "02", title: "Entrega Carinhosa", desc: "Tão rápida que o frescor se mantém intacto." },
              { num: "03", title: "Aproveite o momento", desc: "Comida que acolhe e traz boas memórias." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 border-2 border-[#2b5c40] text-center shadow-[4px_4px_0px_#2b5c40] hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-black text-[#b33939] mb-4">{step.num}</div>
                <h3 className="font-black text-base mb-2 uppercase text-[#2b5c40]">{step.title}</h3>
                <p className="text-xs text-[#4a3b32]/80 leading-relaxed font-bold">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 border-t-4 border-dashed border-[#d8c5b2]/60">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-16 text-[#2b5c40] uppercase tracking-tight">Por que escolher a LaTomata?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Frescor do Campo", desc: "Ingredientes colhidos e selecionados com o cuidado de quem planta o próprio alimento." },
              { title: "Cardápio Afetuoso", desc: "Receitas desenvolvidas para nutrir o corpo sem abrir mão daquele gostinho de comida caseira." },
              { title: "Praticidade Leve", desc: "O prazer de comer bem e saudável, sem a parte trabalhosa de ir para a cozinha." }
            ].map((item, i) => (
              <div key={i} className="bg-[#fcf8f2] p-8 border-2 border-[#3b7a57] shadow-[4px_4px_0px_#3b7a57] hover:-translate-y-1 transition-transform">
                <h3 className="font-black text-lg mb-3 uppercase text-[#2b5c40]">{item.title}</h3>
                <p className="text-xs text-[#4a3b32]/80 leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 border-t-4 border-dashed border-[#d8c5b2]/60">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-12 text-[#2b5c40] uppercase tracking-tight">O que dizem os nossos clientes</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { nome: "Neide", msg: "Parece que estou fazendo um piquenique no parque toda vez que o pedido chega. Comida leve e cheia de afeto!" },
              { nome: "Cláudio S.", msg: "Pratos impecáveis e saborosos. É o momento de pausa perfeito no meio da minha rotina corrida da semana." },
              { nome: "Alfredo", msg: "Assinei o plano mensal e não me arrependo. Qualidade impecável e zero trabalho na cozinha." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 border-2 border-[#b33939] shadow-[4px_4px_0px_#b33939] relative flex flex-col justify-between">
                <p className="text-xs italic text-[#4a3b32] mb-6 font-bold leading-relaxed">"{f.msg}"</p>
                <p className="font-black text-[#b33939] text-xs uppercase tracking-wider">— {f.nome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto bg-[#3b7a57]/10 p-6 border-2 border-[#3b7a57] text-center mb-10 shadow-[4px_4px_0px_#3b7a57]">
          <p className="text-xs text-[#2b5c40] font-black uppercase tracking-wide">
              *Aviso: A LaTomata não se responsabiliza por vontades repentinas de estender uma toalha quadriculada na sala de estar.
          </p>
        </section>

      </main>
    </div>
  );
}