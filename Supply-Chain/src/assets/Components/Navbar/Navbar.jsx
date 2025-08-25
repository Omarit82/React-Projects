import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import './navBar.css'

export const Navbar = () => {
    return(
        <>
            <Nav className="justify-content-between">
                <div className="d-flex">
                    <Link to="/home" className="navBarItem m-2 ms-5">Citymesh</Link>
                    <Link to="/reparaciones" className="navBarItem m-2">Reparaciones</Link>
                    <Link to='/amiar' className="navBarItem m-2">Amiar</Link>
                    <Link to='/tareas_completas' className="navBarItem m-2">Tareas Completas</Link>
                    <NavDropdown title="Administracion" id="basic-nav-dropdown">
                        <Link to='/productos' className="navBarItem m-2">Productos</Link>
                        <Link to='/stock' className="navBarItem m-2">Stock</Link>
                        <Link to='/recibos' className="navBarItem m-2 ">Recibos</Link>
                        <Link to='/remitos' className="navBarItem m-2">Remitos</Link>
                        <Link to='/clientes' className="navBarItem m-2">Clientes</Link>
                        <NavDropdown.Divider />
                        <Link to='/datos' className="navBarItem m-2">Analisis</Link>
                    </NavDropdown>
                </div>   
                <Link to="/about" className="navBarItem m-2 me-5">About</Link>
            </Nav>
        </>
    )
}