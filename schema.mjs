import { buildSchema } from "graphql";

const authors = [
    { id: 1, name: "William Shakespeare" },
    { id: 2, name: "Daniel Defoe" },
    { id: 3, name: "Jean Paul Sartre" },
];

const books = [
    { id: 1, title: "Hamlet", price: 22.5, author: authors[0] },
    { id: 2, title: "Robinson", price: 17.5, author: authors[1] },
    { id: 3, title: "The Wall", price: 42.5, author: authors[2] },
    { id: 4, title: "Being and Nothingness", price: 42.5, author: authors[2] },
    { id: 5, title: "No Exit", price: 32.5, author: authors[2] },
];

export const schema = buildSchema(`
    type Query {
        books: [Book]
        authors: [Author]
        book(id: Int): Book
    }

    type Mutation {
        postBook(title: String, price: Float, authorId: Int): Book
    }

    type Book {
        id: Int
        title: String
        price: Float
        author: Author
    }

    type Author {
        id: Int
        name: String
        books: [Book]
    }
`);

export const resolvers = {
    books: () => books,
    authors: () => authors,
    book: ({ id }) => books.find(book => book.id === id),
    postBook: ({ title, price, authorId }) => {
        const author = authors.find(author => author.id === authorId);
        if (!author) {
            throw new Error("Author not found");
        }
        const newBook = {
            id: books.length + 1,
            title,
            price,
            author,
        };

        books.push(newBook);
        return newBook;
    },
};
