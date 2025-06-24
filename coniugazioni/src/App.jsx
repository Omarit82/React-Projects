import { Route, Routes } from 'react-router';
import './App.css'
import { Header } from './components/header/header';
import { Navbar } from './components/Navbar/Navbar';
import { About } from './components/pages/About';
import { Coiugazioni } from './components/pages/Coniugazioni';
import { Home } from './components/pages/Home';
import { Quiz } from './components/pages/Quiz';

function App() {


  return (
    <>
      <div>
        <Header />
        <Navbar />
        <Routes >   
            <Route path='/' element={ <Home />} />
            <Route path='/coniugazioni'element={ <Coiugazioni />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
