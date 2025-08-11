import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import './navBar.css'

export const Navbar = () => {
    return(
        <>
            <Nav>
                <Link to="/home" className="navBarItem m-2">Home</Link>
                <Link to="/about" className="navBarItem m-2">About</Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/home/3.2' className="navBarItem">Another action</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/home/3.3' className="navBarItem">Something</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Link to='/home/3.4' className="navBarItem">Separated link</Link></NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <hr className="w-75 m-auto"/>
        </>
    )
}