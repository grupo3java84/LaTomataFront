import Categoria from "./Categoria";

export default interface Produto {
  id: number;
  nome: string;
  preco: number;
  disponivel: boolean;
  foto: string;
  descricao: string;
  saudavel: boolean;
  categoria: Categoria;
}