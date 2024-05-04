import { Routes, Route} from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
    </Routes>
  )
}

export default App
