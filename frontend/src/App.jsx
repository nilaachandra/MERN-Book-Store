import { Routes, Route} from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import CreateBook from './components/CreateBook'
import ShowBooks from './components/ShowBooks'
import UpdateBook from './components/UpdateBook'
import DeleteBook from './components/DeleteBook'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<UpdateBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
  )
}

export default App
