import { createContext } from "react";
import { Books } from "../types/Books";
import { User } from "../types/User";


// Criando tipagem do que será passado no contexto
export type AuthContextType = {
    user: User | null;
    books: Books[] | null;
    book: Books | null;
    signin: (email: string, password: string) => {};
    usebooks: (page: number) => {};
    usebook: (id: string) => {};
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);