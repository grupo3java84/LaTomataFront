import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-(--color-bg) text-dark min-h-screen font-sans">
      <section className="min-h-[80vh] flex items-center px-6 md:px-16 py-12 relative overflow-hidden">

        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 -left-10 w-72 h-72 bg-mustard/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 w-full relative z-10">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-nature/10 text-nature font-black px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
              <span></span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-nature leading-tight tracking-tight">
              Seus pratos favoritos, entregues na sua <span className="text-terracotta underline decoration-mustard decoration-4 underline-offset-8">porta</span>.
            </h1>

            <p className="text-base md:text-lg text-dark/80 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Do lanche caprichado ao prato balanceado. Descubra um cardápio completo feito para todos os gostos e momentos do seu dia, com a rapidez que você precisa.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Link to="/produtos" className="button-primary text-white! px-6 py-3 rounded-lg font-semibold transition-colors">
                Ver Cardápio
              </Link>
              <Link to="/categorias" className= "button-primary text-white! px-6 py-3 rounded-lg font-semibold transition-colors">
                Ver Categorias
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-tr from-terracotta to-mustard rounded-3xl opacity-20 blur-sm"></div>

              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=700"
                alt="Prato principal LaTomata"
                className="relative rounded-2xl shadow-2xl object-cover w-full max-w-[450px] border-4 border-cream"
              />
            </div>
          </div>

        </div>
      </section>
      <section className="bg-nature text-cream py-16 px-6 md:px-16 rounded-t-[2.5rem] shadow-inner">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tight">Por que escolher a LaTomata?</h2>
          <p className="text-cream/70 max-w-md mx-auto text-sm">Praticidade de verdade para todas as fomes, com ingredientes selecionados.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-2 hover:border-mustard/50 transition-colors">
              <div className="text-3xl">🚀</div>
              <h3 className="font-bold text-lg text-mustard">Entrega Express</h3>
              <p className="text-sm text-cream/80">Seu prato quentinho chega na velocidade que a sua fome pede.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-2 hover:border-mustard/50 transition-colors">
              <div className="text-3xl">🍔</div>
              <h3 className="font-bold text-lg text-mustard">Cardápio Variado</h3>
              <p className="text-sm text-cream/80">Opções que vão desde lanches rápidos até refeições completas para a família.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-2 hover:border-mustard/50 transition-colors">
              <div className="text-3xl">✨</div>
              <h3 className="font-bold text-lg text-mustard">Padrão Premium</h3>
              <p className="text-sm text-cream/80">Ingredientes frescos combinados para entregar o melhor sabor da região.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}