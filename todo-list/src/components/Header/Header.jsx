import './Header.css';
import logo from '../../assets/img/todo.png'
import { Link } from 'react-router';

export const Header = () => {
    return (
        <>
            <header className='d-flex align-items-center justify-content-center' >
                <img src={logo} alt="App logo" className='me-2' />
                <Link to="/"><h1>To Do</h1></Link>
            </header>
        </>
    )
}