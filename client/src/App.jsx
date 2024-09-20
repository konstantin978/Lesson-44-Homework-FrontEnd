import { Link } from 'react-router-dom'
import './App.css'
import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
  {
    books{
      id
      title
      price
      author{
        name
      }
    }
  } 
`

function App() {

  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  
  return (
    <>
      <h1>HELLO!!!!</h1>
      {loading && <p>Loading...</p>}
      {
        data && data.books.map(book => {
          return <div key={book.id}>
            <p>{book.title}</p>
            <strong>by {book.author.name}</strong>
            <br />
            <Link to='/addbook'>Add Book</Link>
            <hr />
          </div>
        })
      }
    </>
  )
}

export default App
