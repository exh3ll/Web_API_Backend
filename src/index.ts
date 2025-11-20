import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.get('/add', (req: Request, res: Response) => {
    const books = [
        { id: "B-1", title: 1984 },
        { id: "B-2", title: "To Kill a Mockingbird", date: "2015-12-10" }
    ];
    res.status(200).json(books);
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});