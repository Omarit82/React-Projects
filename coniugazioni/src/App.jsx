import { Route, Routes } from 'react-router';
import { Header } from './components/header/header';
import { Navegation } from './components/Navegation/Navegation';
import { About } from './components/pages/About';
import { Coniugazioni } from './components/Coniugazioni/Coniugazioni';
import { Home } from './components/pages/Home';
import { Quiz } from './components/pages/Quiz';
import { Editor } from './components/Editor/Editor';
import { Register } from './components/Usuarios/register';
import { Login } from './components/Usuarios/login';

function App() {


  return (
    <>
      <div>
        <Header />
        <Navegation />
        <Routes >   
            <Route path='/' element={ <Home />} />
            <Route path='/coniugazioni'element={ <Coniugazioni />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  )
}

export default App
