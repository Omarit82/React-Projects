import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import './navBar.css'

export const Navbar = () => {
    return(
        <>
            <Nav className="justify-content-between barra">
                <div className="d-flex">
                    <Link to="/home" className="navBarItem m-2 ms-5">Citymesh</Link>
                    <Link to="/reparaciones" className="navBarItem m-2">Reparaciones</Link>
                    <Link to='/amiar' className="navBarItem m-2">Amiar</Link>
                    <Link to='/tareas_completas' className="navBarItem m-2">Tareas Completas</Link>
                    <NavDropdown title="Administracion" id="basic-nav-dropdown" >
                        <NavDropdown.Item className="navBarItem m-0"><Link to='/productos' >Productos</Link></NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0"><Link to='/stock' >Stock</Link></NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0 "><Link to='/recibos' >Recibos</Link></NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0"><Link to='/remitos' >Remitos</Link></NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0"><Link to='/clientes' >Clientes</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="navBarItem m-0"><Link to='/datos' >Analisis</Link></NavDropdown.Item>
                    </NavDropdown>
                </div>   
                <Link to="/about" className="navBarItem m-2 me-5">About</Link>
            </Nav>
        </>
    )
}