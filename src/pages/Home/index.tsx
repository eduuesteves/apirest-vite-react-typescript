import { ChangeEvent, SetStateAction, SyntheticEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import s from "./styles.module.scss";

import logo from "../../assets/logo-main.png";
import Shape1 from "../../assets/Shape1.png";
import Shape2 from "../../assets/Shape2.png";
import { Modal } from "../../Modal";

export function Home() {
    const [page, setPage] = useState<number>(1);
    const [visible, setVisible] = useState(false);
    const [clickBook, setClickBook] = useState('')
    const { 
        user, 
        books,
        signout,
        usebooks, 
        usebook
    } = useContext(AuthContext);

    // Chamando usebooks do contexto quando o parâmetro page mudar
    // E assim, é possível acessar os books e organizá-los em páginas
    useEffect(()=> {
        async function handleBook() {
            await usebooks(page);
        }
        handleBook();
    }, [page])
    
    // Chamando usebook do contexto quando o parâmetro clickbook mudar
    // E assim, é possível acessar o book específico através do id
    useEffect(() => {
        async function handleBook() {
            const a = await usebook(clickBook);
            setVisible(true);
        }
        handleBook();
    }, [clickBook])

    // Função para deslogar do servidor
    function handleLogout() {
        return signout();
    }

    // Incremento para acessar as páginas no usebook
    function incrementPage() {
        if(page <= 34) setPage(page + 1)
    }

    // Decremento para acessar as páginas no usebook
    function decrementPage() {
        if(page >= 1) setPage(page - 1)
    }

    return(
        <main className={s.wrapper}>
            <header>
                <div className={s.logo}>
                    <img src={logo} alt="logo" />
                    <h1>Books</h1>
                </div>
                <div className={s.profile}>
                    <p>
                        {/** Exibindo na tela o name do user  */}
                        Bem vindo, <span>{user?.name}</span>
                    </p>-
                    <button onClick={handleLogout}>
                        <img src={Shape1} alt="shape1" />
                        <img src={Shape2} alt="shape2" />
                    </button>
                </div>
            </header>
            <ul className={s.ul}>
            {
                // Exibindo na tela os books através do map
                books?.map((b, value) => {
                    return (
                        <li className={s.card} key={value} onClick={() => setClickBook(b.id)}>
                            <img src={b.imageUrl}/>
                            <div className={s.profileBook}>
                                <div>
                                    <strong>{b.title}</strong>
                                    <p className={s.authors}>{b.authors.join(', ')}</p>
                                </div>
                                <div className={s.informations}>
                                    <p>{b.pageCount} páginas</p>
                                    <p>Editora {b.publisher}</p>
                                    <p>Publicdo em {b.published}</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
            <div className={s.page}>
                <p>Página {page} de 34</p>
                {
                    page >= 2 && <button onClick={decrementPage}>{'<'}</button>
                }
                {
                    page <= 33 && <button value={page + 1} onClick={incrementPage}>{'>'}</button>
                }
            </div>

            
            {
                // Chamando modal
                visible ? <Modal onClose={() => setVisible(false)} /> : null
            }
        </main>
    )
}