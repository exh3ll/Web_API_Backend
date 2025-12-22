import { IBookRepository, BookRepository, book } from "../repositories/book.repository";
import { Book } from "../types/book.type";
import { CreateBookDTO, CreateBookDTOType } from "../dtos/book.dto";
let bookRepository: IBookRepository = new BookRepository();
export class BookService {
    getBooks = (): Book[] => {
        //business login/ transformation
        let transformedBooks =
        bookRepository
                    .getAllBooks()
                    .map(bk => {
                        return {
                            ...bk,
                            title: bk.title.toUpperCase()
                        }
                    })
        return transformedBooks;
    }
    createBook = (bookData: CreateBookDTOType): Book => {
        const newBook: Book = {...bookData};
        // same as {id: bookData.id, title: bookData.title}
        let existingBook = bookRepository.getBookById(newBook.id);
        if(existingBook){
            throw new Error("Book ID already exists");
        }
        return bookRepository.createBook(newBook);
    }

    getBookById = (id: string): Book | undefined => {
        const book = bookRepository.getBookById(id);

        if (!book) {
            throw new Error("Book not found");
        }

        return book;
    };
}