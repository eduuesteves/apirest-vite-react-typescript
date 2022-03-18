import { useEffect, useState } from "react";
import { api, useApi } from "../hooks/useApi";
import { Books } from "../types/Books";
import { User } from "../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element}) {
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Books[] | null>(null);
    const [book, setBook] = useState<Books | null>(null);

    const apiAxios = useApi();

    // validando Token
    useEffect(() => {
        const validateToken = async () => {

            // chamando token no localstorage
            const token = await localStorage.getItem('@token');
            const storage = await localStorage.getItem('@refresh-token');
            api.defaults.headers.common['authorization'] = `Bearer ${token}`;
            api.defaults.headers.common['refresh-token'] = `${storage}`;
            api.defaults.headers.common['accept'] = '*/*';
            if (storage) {
                const data = await apiAxios.validateToken(storage);
                if (data) {
                    setUser(data);
                }
            }
        }
        validateToken();
    }, [apiAxios])

    // passando parâmetros para logar no useApi -> signin
    async function signin(email: string, password: string) {
        const data = await apiAxios.signin(email, password);
        
        // se retornar uma resposta, passará para user
        if(data) {
            setUser(data);
        }
    }

    // passando parâmetros para acessar os books no useApi -> useBooks
    async function usebooks(page: number) {
        const data = await apiAxios.useBooks(page);

        // se retornar uma resposta, passará para books
        if(data) {
            setBooks(data);
        }
    }

    // passando parâmetros para acessar book especifico no useApi -> useBook
    async function usebook(id: string) {
        const data = await apiAxios.useBook(id);

        // se retornar uma resposta, passará para book
        if(data) {
            setBook(data);
        }
    }

    // deslogando com useApi -> logout
    async function signout() {
        await apiAxios.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, books, book, signin, usebooks, usebook, signout }}>
            {children}
        </AuthContext.Provider>
    )
}