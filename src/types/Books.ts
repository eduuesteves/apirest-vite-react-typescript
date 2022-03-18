// Tipagem dos dados recebidos do servidor para books
export interface Books {
    authors: [];
    category: string;
    description: string;
    id: string;
    imageUrl: string;
    isbn10: string;
    isbn13: string;
    language: string;
    pageCount: number;
    published: number;
    publisher: string;
    title: string;
}