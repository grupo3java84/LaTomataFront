import { useState } from "react";
import type Produto from "../../../models/Produto";
import CardProduto from "../cardProduto/CardProduto";

const produtosEstaticos: Produto[] = [
  { id: 1, nome: "Bruschetta", descricao: "Pão tostado com tomate fresco, manjericão e azeite.", preco: 28.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_bruschetta.png", categoria: { id: 1, tipo: "Entradas" } },
  { id: 2, nome: "Caprese", descricao: "Salada de tomate, muçarela de búfala e manjericão.", preco: 34.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_caprese.png", categoria: { id: 1, tipo: "Entradas" } },
  { id: 3, nome: "Pato Confitado", descricao: "Pato confitado com molho de laranja e legumes.", preco: 89.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_duck.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 4, nome: "Cordeiro Grelhado", descricao: "Carré de cordeiro grelhado com ervas finas e purê.", preco: 95.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_lamb.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 5, nome: "Medalhão", descricao: "Medalhão de filé mignon ao molho de cogumelos.", preco: 79.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_medallion.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 6, nome: "Polvo Grelhado", descricao: "Polvo grelhado com azeite, alho e batatas rústicas.", preco: 98.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_octopus.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 7, nome: "Massa ao Molho", descricao: "Massa fresca artesanal ao molho de tomate e manjericão.", preco: 52.90, disponivel: true, saudavel: false, foto: "./assets/produtos/Image_pasta.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 8, nome: "Salada Gourmet", descricao: "Mix de folhas, nozes, queijo grana padano e vinagrete.", preco: 38.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_salad.png", categoria: { id: 4, tipo: "Saladas" } },
  { id: 9, nome: "Salmão Grelhado", descricao: "Filé de salmão grelhado com legumes no vapor e limão.", preco: 72.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_salmon.png", categoria: { id: 2, tipo: "Pratos Principais" } },
  { id: 10, nome: "Tartare de Atum", descricao: "Atum fresco marinado com gergelim, gengibre e molho shoyu.", preco: 64.90, disponivel: true, saudavel: true, foto: "./assets/produtos/Image_tartare.png", categoria: { id: 1, tipo: "Entradas" } },
];

function ListaProdutos() {
  const [produtos] = useState<Produto[]>(produtosEstaticos);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="flex flex-wrap justify-center gap-8">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;