import { DealsContainer } from "../../Components/DealsContainer/DealsContainer"


export const TareasCompletas = () => {
    return(
        <>
            <h2 className="text-center">Tareas Completas:</h2>
            <DealsContainer task={67052576} completed={true} />
        </>
    )
}