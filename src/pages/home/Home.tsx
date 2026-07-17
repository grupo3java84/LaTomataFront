import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-[#fdfbf7] text-[#3d2b1f] min-h-screen font-sans">
      <main className="max-w-7xl mx-auto px-8  pb-20">

        {/* Seção Hero */}
        <section className="min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-12 py-16 relative">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-block bg-[#e67e22]/10 text-[#e67e22] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest italic border border-[#e67e22]/20">
              Patrocinadores oficiais da sua dieta
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#2d5a27] uppercase italic leading-none tracking-tighter">
              Comer bem é <br /> um ato de rebeldia.
            </h1>

            <p className="text-lg md:text-xl text-[#3d2b1f]/80 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Entregamos comida saudável na sua porta. O suficiente para você se sentir um atleta, mas sem o sofrimento de ter que cozinhar brócolis às 22h.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Link to="/produtos" className="bg-[#2d5a27] text-white px-8 py-4 rounded-sm font-black uppercase hover:bg-[#e67e22] transition-all hover:scale-105 shadow-lg">
                Ver Cardápio
              </Link>
              <Link to="/categorias" className="bg-transparent border-2 border-[#2d5a27] text-[#2d5a27] px-8 py-4 rounded-sm font-black uppercase hover:bg-[#2d5a27] hover:text-white transition-all">
                Ver Categorias
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-linear-to-tr from-[#e67e22] to-[#2d5a27] rounded-3xl opacity-20 blur-sm"></div>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=700"
                alt="Prato principal LaTomata"
                className="relative rounded-2xl shadow-2xl object-cover w-full max-w-lg border-4 border-[#fdfbf7]"
              />
            </div>
          </div>
        </section>

        {/* Seção 3 Passos */}
        <section className="py-20 border-t-2 border-[#2d5a27]/20">
          <h2 className="text-3xl font-black text-center mb-16 text-[#2d5a27] uppercase tracking-tighter">Sua jornada saudável</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Escolha seu prato", desc: "Do fit ao 'hoje pode'." },
              { num: "02", title: "Entrega Express", desc: "Tão rápido que a alface não murcha." },
              { num: "03", title: "Saboreie", desc: "Comida que abraça o estômago." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                {/* Alterei a classe abaixo de 'text-[#2d5a27]/10' para 'text-[#2d5a27]' */}
                <div className="text-6xl font-black text-[#2d5a27] mb-4">{step.num}</div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide text-[#2d5a27]">{step.title}</h3>
                <p className="text-sm opacity-70">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seção Diferenciais */}
        <section className="py-20 border-t-2 border-[#2d5a27]/20">
          <h2 className="text-3xl font-black text-center mb-16 text-[#2d5a27] uppercase tracking-tighter">Por que a LaTomata?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Entrega Express", desc: "Tão rápida que o seu pedido chega antes da sua fome (e da sua desculpa para pedir um lanche calórico)." },
              { title: "Cardápio Variado", desc: "Opções para quem quer manter o 'shape' e para quem só quer manter a sanidade mental hoje." },
              { title: "Padrão Premium", desc: "Ingredientes tão frescos que você vai se sentir o próprio chef, sem a parte de ter que lavar a louça depois." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 border-t-4 border-[#2d5a27] shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-black text-xl mb-4 uppercase text-[#2d5a27]">{item.title}</h3>
                <p className="text-sm text-[#3d2b1f]/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="py-20 border-t-2 border-[#2d5a27]/20">
          <h2 className="text-3xl font-black text-center mb-12 text-[#2d5a27] uppercase tracking-tighter">O que nossos clientes dizem</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { nome: "Neide", msg: "Eu achava que comida saudável era um castigo, tipo comer papelão temperado. A LaTomata finalmente me deu uma salada que não me faz sentir que estou pagando penitência." },
              { nome: "Cláudio S.", msg: "A única plataforma que me trata melhor do que meu chefe. Quando o prato chega impecável, eu até esqueço que amanhã é segunda-feira." },
              { nome: "Alfredo", msg: "Assinei o plano mensal. Agora meu único esforço físico é abrir a porta pro motoboy. Se o objetivo é ser fitness sem suar, esse é o caminho." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 border-l-4 border-[#e67e22] shadow-xl hover:-translate-y-2 transition-all">
                <p className="text-lg italic text-[#3d2b1f] mb-6">"{f.msg}"</p>
                <p className="font-black text-[#2d5a27] text-sm uppercase">— {f.nome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-2xl mx-auto bg-[#2d5a27]/5 p-8 rounded-sm border border-[#2d5a27]/20 text-center mb-20">
          <p className="text-xs text-[#2d5a27] uppercase font-bold tracking-widest italic">
            * Aviso: A LaTomata não se responsabiliza por ataques de inveja dos seus colegas de trabalho. Coma com discrição.
          </p>
        </section>

      </main>
    </div>
  );
}