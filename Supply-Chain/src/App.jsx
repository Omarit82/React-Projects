import { Header } from "./assets/Components/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { Navbar } from "./assets/Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./assets/Components/Footer/Footer"
import { UserProvider } from "./assets/Contexts/UserContext/UserContext"
import { Login } from "./assets/Pages/Login/Login"
import { Register } from "./assets/Pages/Register/Register"
import { Home } from "./assets/Pages/Home/Home"
import {ProtectedRoute} from "./assets/Components/ProtectedRoute/ProtectedRoute.jsx"
import { Reparaciones } from "./assets/Pages/Home/Reparaciones.jsx"
import { TareasCompletas } from "./assets/Pages/Home/TareasCompletas.jsx"


function App() {


  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/reparaciones' element={<ProtectedRoute><Reparaciones /></ProtectedRoute>} />
          <Route path='/tareas_completas' element={<ProtectedRoute><TareasCompletas /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
