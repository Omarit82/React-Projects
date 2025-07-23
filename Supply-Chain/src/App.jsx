import { Header } from "./assets/Components/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { Navbar } from "./assets/Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./assets/Components/Footer/Footer"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/'  />
        <Route />
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
