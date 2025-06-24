import './main.css'

export const Coiugazioni = () => {
    const handleClick = () =>{
        
    }

    return(
        <main>
            <hr />
            <div className='d-flex align-items-center justify-content-between '>
                <button onClick={handleClick} className="btn btn-info session">Nuova Sessione</button>
                <h2 className='text-center'>Verbo Scelto</h2>
                <div>
                    <input type="text" name="" id="" className='me-2 scelto' />
                </div>
            </div>
        </main>
    )
}