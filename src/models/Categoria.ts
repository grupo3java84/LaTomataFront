import type Produto from "./Produto";

export default interface Categoria {
    id: number;
    categoria: string;
    produto?: Produto[] | null;
}