import { Header } from "./assets/Components/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { Navbar } from "./assets/Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./assets/Components/Footer/Footer"
import { UserProvider } from "./assets/Contexts/UserContext/UserContext"
import { Login } from "./assets/Pages/Login/Login"

function App() {


  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route />
          <Route />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
