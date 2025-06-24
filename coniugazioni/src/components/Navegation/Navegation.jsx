import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import './navigation.css';


export const Navegation = () => {
    return(
        <Navbar expand="lg" className="navegador" id="navegador">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex justify-content-around">
                        <Link to="/" className='btn btn-info p-2'>Home</Link>
                        <Link to="/coniugazioni" className='btn btn-info p-2'>Coniugazioni</Link>
                        <Link to="/quiz" className='btn btn-info'  >Quiz</Link>
                        <Link to="/about" className='btn btn-info '>About</Link>
                    </Nav>
                </Navbar.Collapse> 
            </Container>
        </Navbar>    
    )
}