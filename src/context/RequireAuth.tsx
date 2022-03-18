import { useContext } from "react";
import { Login } from "../pages/Login";
import { AuthContext } from "./AuthContext";

export function RequireAuth({ children }: { children: JSX.Element}) {

    const auth = useContext(AuthContext);

    // verificando se user já existe
    // caso não, chamará o componente <Login />
    if(!auth.user) {
        return <Login />
    }

    return children;
}