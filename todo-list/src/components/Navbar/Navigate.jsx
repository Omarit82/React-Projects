import './Navigate.css';

export const Navigate= ({ user }) =>{
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{ user }</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggler" aria-controls="toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="toggler">
                    <ul className="navbar-nav ">
                        <li className="nav-item d-flex justify-content-end">
                            <a className="nav-link active" aria-current="page" href="#">To-Do</a>
                        </li>
                        <li className="nav-item d-flex justify-content-end">
                            <a className="nav-link" href="#">Done</a>
                        </li>
                        <li className="nav-item d-flex justify-content-end">
                            <a className="nav-link" href="/newTask">Add new</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}