import axios from "axios";

export const api = axios.create({
    baseURL: 'https://latomata.onrender.com'
});

export const post = async <T>(url: string, dados: T, setDados: Function, header?: object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const put = async <T>(url: string, dados: T, setDados: Function, header?: object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

export const get = async (url: string, setDados: Function, header?: object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const deletar = async (url: string, header?: object) => {
    await api.delete(url, header);
}

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export default api;
