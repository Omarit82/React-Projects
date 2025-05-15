import { Route, Routes } from 'react-router-dom';
import { Navigate } from './components/Navbar/Navigate';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Body } from './components/Body/Body';
import { NewTask } from './components/NewTask/NewTask';
import { Done } from './components/Done/Done';


function App() {

  return (
    <>
      <Header user={"Omarit"} />
      <Navigate/>
      <Routes >
        <Route path='/' element={ <Body />} />
        <Route path='/newTask'element={ <NewTask />} />
        <Route path='/done' element={<Done />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
