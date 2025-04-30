import './Task.css';

export const Task = ({title, description, date, todo}) => {

    return (
        <div className='task'>
            <div className='d-flex justify-content-between'>
                <h2 className='title'>{title}</h2>
                <div className="d-flex flex-column align-items-center">
                    <h2 className='titleDate'>{date.slice(0, 10)}</h2>
                    <h2 className='titleDate'>{date.slice(11, 19)}</h2>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <h2 className='titleDate'>{todo.slice(0, 10)}</h2>
                    <h2 className='titleDate'>{todo.slice(11, 19)}</h2>
                </div>
                <div className='m-2 d-flex justify-content-center align-items-center'>
                    <input type="checkbox" name="checkbox" className='me-2' />
                    <label htmlFor="checkbox"> Done! </label>
                </div>
                
            </div>
            
            <p className='text-center m-2'>{description}</p>
        </div>
    )
}