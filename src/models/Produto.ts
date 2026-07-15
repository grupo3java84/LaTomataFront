import type Categoria from "./Categoria";
import type UsuarioLogin from "./UsuarioLogin";

export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    disponivel: boolean;
    foto: string;
    descricao: string;
    saudavel: boolean;
    categoria: Categoria | null;
    usuario: UsuarioLogin | null;
}