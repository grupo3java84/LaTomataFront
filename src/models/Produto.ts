import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    disponivel: boolean;
    foto: string;
    descricao: string;
    saudavel: boolean;
    categoria: Categoria | null;
    usuario: Usuario | null;
}