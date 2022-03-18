import axios from "axios";

// Criando conexão com o servidor
export const api = axios.create({
    baseURL: "http://books.appnoz.com.br/api/v1"
})

// Criando objeto com as funções para acessar servidor
export const useApi = () => ({

    // Validando token
    validateToken: async (refreshToken: string) => {
        const response = await api.post('/auth/refresh-token', { refreshToken });
        return response.data;
    },

    // Acessando login com email e senha
    signin: async (email: string, password: string) => {
        const response = await api.post('/auth/sign-in', { email, password });

        localStorage.removeItem('@token');
        localStorage.removeItem('@refresh-token');

        const token = await response.headers['authorization'];
        const refreshToken = await response.headers['refresh-token'];

        localStorage.setItem('@token', token);
        localStorage.setItem('@refresh-token', refreshToken);
        
        return response.data;
    },

    // Acessando books
    useBooks: async (page: number) => {
        const response = await api.get(`/books?page=${page}&amount=12`);
        return response.data.data;
    },

    // Acessando book específico
    useBook: async (id: string) => {
        const response = await api.get(`http://books.appnoz.com.br/api/v1/books/${id}`)
        return response.data;
    },

    // Deslogando acesso ao servidor
    logout: async () => {
        window.location.reload();
    }
})

// Chamando localstorage para token e refresh token 
// Havendo localstorage dos doois
// Passa-os no cabeçalho da requisição
const token = await window.localStorage.getItem('@token');
const refreshToken = await window.localStorage.getItem('@refresh-token');

if (token && refreshToken) {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['refresh-token'] = `${refreshToken}`;
    api.defaults.headers.common['accept'] = '*/*';
}