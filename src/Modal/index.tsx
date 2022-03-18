import { ChangeEvent, HTMLAttributes, SyntheticEvent, useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

import s from './styles.module.scss';

import quotes from "../assets/Quotes.png";


// Modal para mostrar book clicado
export function Modal({onClose = () => {}}) {

    const { book } = useContext(AuthContext);

    return (
        <div className={s.wrapper} onClick={onClose}>
            <div className={s.content}>
                <img 
                    src={book?.imageUrl} 
                    alt={book?.title} 
                />
                <div className={s.profileBook}>
                    <div className={s.title}>
                        <h1>{book?.title}</h1>
                        <p>{book?.authors.join(', ')}</p>
                    </div>
                    <div>
                        <strong className={s.strong}>Informações</strong>
                        <ul>
                            <li>
                                <p>Páginas</p>
                                <span>{book?.pageCount}</span>
                            </li>
                            <li>
                                <p>Editora</p>
                                <span>{book?.publisher}</span>
                            </li>
                            <li>
                                <p>Publicação</p>
                                <span>{book?.published}</span>
                            </li>
                            <li>
                                <p>Idioma</p>
                                <span>{book?.language}</span>
                            </li>
                            <li>
                                <p>Título Original</p>
                                <span>{book?.title}</span>
                            </li>
                            <li>
                                <p>ISBN-10</p>
                                <span>{book?.isbn10}</span>
                            </li>
                            <li>
                                <p>ISBN-13</p>
                                <span>{book?.isbn13}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={s.description}>
                        <strong className={s.strong}>Resenha da Editora</strong>
                        <p><img src={quotes} /> {book?.description}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}