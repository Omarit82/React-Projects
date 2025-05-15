import './Header.css';
import logo from '../../assets/img/todo.png'
import { Link } from 'react-router';

export const Header = ({ user }) => {
    return (
        <header className='row align-items-center m-0' >
            <div className='col-7'>
                <div className='d-flex  justify-content-end'>
                    <img src={logo} alt="App logo" className='me-2' />
                    <Link to="/"><h1>To Do</h1></Link>
                </div>
            </div>
            <Link className='col-4 d-flex justify-content-end p-1'>{user}</Link>            
        </header>
    )
}