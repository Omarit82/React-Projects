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
                    <Link to='/linkDealEmpresas' className="navBarItem m-2">Link Negocio-Empresas</Link>
                    <Link to='/despachosReales' className="navBarItem m-2">Despachos Reales</Link>
                    <NavDropdown title="Administracion" id="basic-nav-dropdown" >
                        <NavDropdown.Item className="navBarItem m-0" href='/productos'>Productos</NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0" href='/stock'>Stock</NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0" href='/recibos' >Recibos</NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0" href='/remitos'>Remitos</NavDropdown.Item>
                        <NavDropdown.Item className="navBarItem m-0" href='/clientes'>Clientes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="navBarItem m-0" href='/datos'>Analisis</NavDropdown.Item>
                    </NavDropdown>
                </div>   
                <Link to="/about" className="navBarItem m-2 me-5">About</Link>
            </Nav>
        </>
    )
}