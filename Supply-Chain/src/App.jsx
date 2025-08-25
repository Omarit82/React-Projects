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
import { Reparaciones } from "./assets/Pages/Reparaciones/Reparaciones.jsx"
import { TareasCompletas } from "./assets/Pages/TareasCompletas/TareasCompletas.jsx"
import { Clientes } from "./assets/Pages/Clientes/Clientes.jsx";
import { Amiar } from "./assets/Pages/Amiar/Amiar.jsx"
import { ListProducts } from "./assets/Pages/ListProducts/ListProducts.jsx"
import { ProductProvider } from "./assets/Contexts/ProductContext/ProductContext.jsx"
import { Remito } from "./assets/Pages/Remito/Remito.jsx"


function App() {


  return (
    <UserProvider>
    <ProductProvider>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/reparaciones' element={<ProtectedRoute><Reparaciones /></ProtectedRoute>} />
          <Route path='/tareas_completas' element={<ProtectedRoute><TareasCompletas /></ProtectedRoute>} />
          <Route path='/amiar' element={<ProtectedRoute><Amiar /></ProtectedRoute>} />
          <Route path='/clientes' element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
          <Route path='/productos' element={<ProtectedRoute><ListProducts /></ProtectedRoute>} />
          <Route path='/remito' element={<ProtectedRoute><Remito /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductProvider>
    </UserProvider>
  )
}

export default App
