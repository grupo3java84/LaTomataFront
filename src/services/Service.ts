import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const listarCategorias = async (setDados: Function, header: Object) => {
  const resposta = await api.get('/categorias', header)
  setDados(resposta.data)
}

export const buscarCategoria = async (nome: string, setDados: Function, header: Object) => {
  const resposta = await api.get(`/categorias/nome/${nome}`, header)
  setDados(resposta.data)
}


export const cadastrarCategoria = async (dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post('/categorias', dados, header)
  setDados(resposta.data)
}

export const atualizarCategoria = async (dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put('/categorias', dados, header)
  setDados(resposta.data)
}

export const deletarCategoria = async (id: string, header: Object) => {
  await api.delete(`/categorias/${id}`, header)
}