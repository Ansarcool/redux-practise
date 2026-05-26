import './App.css'
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./services/store.ts";
import {addBook, type TBook} from "./services/slices.ts";
import {useState} from "react";

export type TBookFormState = Omit<TBook, 'id'>
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books)

  const [FormState, setFormState] = useState<TBookFormState>({
    title: '',
    author: '',
  })
const onSubmit = (e: React.SubmitEvent) => {
  e.preventDefault();
  dispatch(addBook({
    ...FormState,
    id: crypto.randomUUID()
  }))
}
  return (
  <>
    <form onSubmit={onSubmit}>
      <input onChange={e => setFormState({...FormState, title: e.target.value})}/>
      <input onChange={e => setFormState({...FormState, author: e.target.value})}/>
      <button>Create</button>
    </form>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
      </tr>
      </thead>
      <tbody>
      {books.map(book => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
          </tr>
      ))}
      </tbody>
    </table>
  </>
  )
}

export default App
