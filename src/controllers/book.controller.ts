import { Request,Response } from "express";
import {z} from 'zod';
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.type";
import { BookService } from "../services/book.service";
import { id } from "zod/v4/locales";

const bookService = new BookService();




// export type Book = {
//     id: string;
//     title: string;
//     date?:string;
// }


export class BookController {
    createBook = (req: Request, res: Response) => {
        try{

            const validation = CreateBookDTO.safeParse(req.body);
            if(!validation.success){
              return res.status(400).json({errors:validation.error})
            }
            const{ id, title} = validation.data;
            const newBook: Book = bookService.createBook({id, title});
            return res.status(201).json(newBook);

        }catch(err: Error | any){
            return res.status(500).json({error: err.message ?? 'Internal Service Error'});
        }
        
    }

    getBooks = (req: Request, res: Response) =>{
    const return_book: Book[] = bookService.getBooks();
    res.status(200).json(return_book);
    }

    // getBookById = (req: Request, res: Response) => {
    //     const get_book = bookService.getBookById(id);
    //     res.status(200).json(get_book);

    // }

    getBookById = (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = bookService.getBookById(id);

        return res.status(200).json(book);
    } catch (error: any) {
        return res.status(404).json({ message: error.message });
    }
};

}