import './Task.css';

export const Task = ({title, description, date, todo}) => {

    return (
        <div className='task'>
            <div className='container'>
                <div className="row">
                    <h2 className='title col-7'>{title}</h2>
                    <div className='pt-3 col-3'>
                        <input type="checkbox" name="checkbox" className='me-2' />
                        <label htmlFor="checkbox"> Done! </label>
                    </div>
                </div>
                <hr className='m-auto' />
                <div className="row">
                    <div className="col-6 formulario">
                        <h3 className='text-center'>Created:</h3>
                        <h4 className='titleDate col'>Date: {date.slice(0, 10)}</h4>
                        <h4 className='titleDate col'>Hour: {date.slice(11, 19)}</h4>
                    </div>
                    <div className="col-6">
                        <h3 className="text-center">To do on:</h3>
                        <h2 className='titleDate'>Date: {todo.slice(0, 10)}</h2>
                        <h2 className='titleDate'>Hour: {todo.slice(11, 19)}</h2>
                    </div>
                </div>   
                <hr className='m-auto'/>
                <div className="row">
                    <p className='text-center m-2'>{description}</p>
                </div>            
            </div>
            
        </div>
    )
}