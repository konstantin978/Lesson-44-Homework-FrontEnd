import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddBook } from './components/AddBook.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:4005/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addbook",
    element: <AddBook />,
  },
]);

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
