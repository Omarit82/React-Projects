import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";


export const LinkDealEmpresa = () => {
    const [deals,setDeals] = useState([]);
    const [after,setAfter] = useState(null);
    const [prevStack,setPrevStack] = useState([]);
    const [loading,setLoading] = useState(false);

    /**Llamado a todas las tareas - paginacion.  */
    const dealEmpresas = async(cursor=null) => {
            setLoading(true);
            try {
                const respuesta = await fetch(`http://localhost:3000/hubspot/dealsAnalitics?pageSize=100${cursor?`&after=${cursor}`:""}`,
                    { method: 'GET', credentials: 'include' }
                );
                const deals = await respuesta.json();
                console.log(deals);
                /**de cada deal tengo que obtener la empresa asociada. */
                
                setDeals(deals.Deals);
                setAfter(deals.paging?.next?.after || null);
            } catch (error) {
                console.log("Error al cargar los deals",error.message);
            } finally {
                setLoading(false);
            }
        };
    useEffect(()=>{       
        dealEmpresas();
    },[]);

    const handleNext = () => {
        if(after){
            setPrevStack((prev)=> [...prev,after]);
            tareasCompletas(after);
        }
    }

    const handlePrev = () => {
        const prev = [...prevStack];
        prev.pop();
        const prevAfter = prev.length >0 ? prev[prev.length -1]:null;
        setPrevStack(prev);
        tareasCompletas(prevAfter);
    }
    const formatDate = (isoDate)=>{
        const fecha = new Date(isoDate);
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const hora = fecha.getHours().toString().padStart(2, "0");
        const min = fecha.getMinutes().toString().padStart(2, "0");
        return `${dia}-${mes}-${anio}`;
    }

    return(
        <main>
            <h2 className="text-center">Link Negocio-Empresa:</h2>
            { loading ? (<p>Loading</p>):(
                <Table>
                    <thead>
                        <tr>
                            <th>Fecha de cierre</th>
                            <th>Id de negocio</th>
                            <th>Nombre de negocio</th>
                            <th>Nombre Empresa</th>
                            <th>Id de la empresa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((deal)=>(
                            <tr key={deal.id}>
                                <td>
                                    {formatDate(deal.properties.closedate)} 
                                </td>
                                <td>{deal.id}</td>
                                <td>{deal.properties?.dealname || "deal sin nombre"}</td>
                                <td>{deal.company?.name || "Empresa sin nombre"}</td>
                                <td>{deal.company?.hs_object_id}</td>
                            </tr>
                            )
                        )}
                    </tbody>
                </Table>               
            )}
            <div className="d-flex justify-content-around">
                <Button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={handlePrev} disabled={prevStack.length === 0}>Anterior</Button>
                <Button className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={handleNext} disabled={!after}>Siguiente</Button>
            </div>
        </main>
    )
}









































































































































































































































































































































































































































































































































































































































