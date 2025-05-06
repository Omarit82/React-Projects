import './Header.css';

import logo from '../../assets/img/todo.png'
export const Header = () => {
    return (
        <>
            <header className='d-flex align-items-center justify-content-center' >
                <img src={logo} alt="App logo" className='me-2' />
                <h1>To Do</h1>
            </header>
        </>
    )
}