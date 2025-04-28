import './Task.css';

export const Task = ({title, description, date}) => {
    return (
        <div className='task'>
            <div className='d-flex justify-content-between'>
                <h2 className='title'>{title}</h2>
                <h2 className='titleDate'>{date}</h2>
                <div className='m-2'>
                    <input type="checkbox" name="checkbox" />
                    <label htmlFor="checkbox"> Done! </label>
                </div>
                
            </div>
            
            <p className='text-center m-2'>{description}</p>
        </div>
    )
}