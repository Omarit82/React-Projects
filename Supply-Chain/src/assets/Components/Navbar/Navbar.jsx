import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import './navBar.css'

export const Navbar = () => {
    return(
        <>
            <Nav className="justify-content-between">
                <div className="d-flex">
                    <Link to="/home" className="navBarItem m-2 ms-5">Home</Link>
                    <Link to="/reparaciones" className="navBarItem m-2">Reparaciones</Link>
                    <NavDropdown title="Desplegable" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to='/tareas_completas' className="navBarItem">Tareas Completas</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to='/stock' className="navBarItem">Stock</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to='/recibos' className="navBarItem">Recibos</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to='/remitos' className="navBarItem">Remitos</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><Link to='/datos' className="navBarItem">Analisis</Link></NavDropdown.Item>
                </NavDropdown>
                </div>   
                <Link to="/about" className="navBarItem m-2 me-5">About</Link>
            </Nav>
        </>
    )
}