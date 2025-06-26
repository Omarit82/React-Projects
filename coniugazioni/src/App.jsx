import { Route, Routes } from 'react-router';
import './App.css'
import { Header } from './components/header/header';
import { Navegation } from './components/Navegation/Navegation';
import { About } from './components/pages/About';
import { Coiugazioni } from './components/pages/Coniugazioni';
import { Home } from './components/pages/Home';
import { Quiz } from './components/pages/Quiz';
import { Login } from './components/pages/login';
import { Editor } from './components/pages/Editor';

function App() {


  return (
    <>
      <div>
        <Header />
        <Navegation />
        <Routes >   
            <Route path='/' element={ <Home />} />
            <Route path='/coniugazioni'element={ <Coiugazioni />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/editor' element={<Editor />} />
        </Routes>
      </div>
    </>
  )
}

export default App
