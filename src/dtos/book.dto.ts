import {z} from 'zod';
import { BookSchema } from '../types/book.type';

// DTO  - Data Transfer Object
export const CreateBookDTO = BookSchema.omit({date: true}); // what client sends to server
export type CreateBookDTOType = z.infer<typeof CreateBookDTO>;