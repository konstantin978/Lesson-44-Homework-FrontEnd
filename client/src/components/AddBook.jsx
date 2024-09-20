import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const POST_BOOK = gql`
  mutation PostBook($title: String!, $price: Float!, $authorId: Int!) {
    postBook(title: $title, price: $price, authorId: $authorId) {
      id
      title
      price
      author {
        id
        name
      }
    }
  }
`;

export const AddBook = () => {
    const [postBook, { loading, error, data }] = useMutation(POST_BOOK);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
    });

    const [selectedAuthorId, setSelectedAuthorId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAuthorChange = (e) => {
        setSelectedAuthorId(parseInt(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postBook({
            variables: {
              title: formData.title,
              price: parseFloat(formData.price),
              authorId: selectedAuthorId,
            },
        });
    };

    return (
        <>
            <h1>Add Book!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="number"
                    placeholder="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <br />
                <select name="author" onChange={handleAuthorChange}>
                    <option value="">Select Author</option>
                    <option value="1">William Shakespeare</option>
                    <option value="2">Daniel Defoe</option>
                    <option value="3">Jean Paul Sartre</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data && <p>Book added successfully :)</p>}
        </>
    );
};
