import { Link } from 'react-router';
import './Navigate.css';

export const Navigate= () =>{

    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggler" aria-controls="toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="toggler">
                    <ul className="navbar-nav ">
                        <li className="nav-item d-flex justify-content-end">
                            <Link to='/' className='btn'>To do</Link>
                        </li>
                        <li className="nav-item d-flex justify-content-end">
                            <Link to='/done' className='btn'>Done</Link>
                        </li> 
                        <li className="nav-item d-flex justify-content-end">
                            <Link to='/newTask' className='btn'>New Task</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}