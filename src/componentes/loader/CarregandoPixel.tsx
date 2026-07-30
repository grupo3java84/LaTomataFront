export default function CarregandoPixel() {
  return (
    <div className="flex flex-col items-center justify-center my-16 gap-3 font-mono">
      <img
        src="./TomatoCut.png"
        alt="Carregando LaTomata..."
        className="w-12 h-12 [image-rendering:pixelated] animate-spin [animation-duration:2s]"
      />
      <span className="text-xs font-black text-[#4a3b32]/70 uppercase tracking-widest animate-pulse">
        Preparando a cesta...
      </span>
    </div>
  );
}