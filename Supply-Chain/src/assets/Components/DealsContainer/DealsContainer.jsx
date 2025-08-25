import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { Deal } from "../Deal/Deal";
import { Grid} from "ldrs/react";
import 'ldrs/react/Quantum.css';
import 'ldrs/react/Grid.css';
import { Button } from "react-bootstrap";
import './dealsContainer.css';
import { ProductContext } from "../../Contexts/ProductContext/ProductContext";

export const DealsContainer = (props) => {
    const { getSession } = useContext(UserContext);
    
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState([]);
    const [ordenAscendente, setOrdenAscendente] = useState(true);
    const [search,setSearch] = useState(null);
 
   

    const ordenPrioridad = {
        NONE: 0,
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3,
    };

    const ordenarDeals = (arr, asc = true) => {
        return [...arr].sort((a, b) => {
            // --- Orden por prioridad ---
            const pa = ordenPrioridad[a.prioridad] ?? 0;
            const pb = ordenPrioridad[b.prioridad] ?? 0;
            if (pa !== pb) {
            return asc ? pa - pb : pb - pa;
        }
        // --- Si la prioridad es igual, ordenar por fecha ---
        const fa = a.fecha ? new Date(a.fecha).getTime() : 0;
        const fb = b.fecha ? new Date(b.fecha).getTime() : 0;
        return asc ? fa - fb : fb - fa;
        });
    };
    /**BUSCADOR */
    const searchText = (e) => {
        setSearch(e.target.value);
    }
   
    const filteredDeals = deals.filter(dl =>
        !search || dl.properties.dealname?.toLowerCase().includes(search.toLowerCase())
    );
    /*************/
    useEffect(() => {
        let mounted = true;
        const getDeals = async () => {
            try {
                const sesion = await getSession();
                if (!sesion) {
                    window.location.href = 'http://localhost:3000/hubspot/install';
                    return;
                }
                const respuesta = await fetch(
                    `http://localhost:3000/hubspot/deals/${props.deal}/${props.completed}`,
                    { method: 'GET', credentials: 'include' }
                );
                if (respuesta.ok && mounted) {
                    const resultado = await respuesta.json();
                    const dealsList = resultado?.Deals?.results ?? [];
                    setDeals(ordenarDeals(dealsList, ordenAscendente));
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        getDeals();
        return () => { mounted = false; };
    }, [props.deal, props.completed, ordenAscendente]);

    const dealSinTask = (id) => {
        setDeals((prev) => {
            const nuevo = prev.filter((dl) => dl.id !== id);
            return ordenarDeals(nuevo, ordenAscendente);
        });
    };

    const addFecha = (id, fecha, prioridad) => {
        setDeals((prev) => {
            const actualizado = prev.map((dl) =>
                dl.id === id ? { ...dl, fecha,prioridad} : dl
            );
            return ordenarDeals(actualizado, ordenAscendente);
        });
    };

    const ordenar = () => {
        setOrdenAscendente(prevAsc => {
            const nuevoAsc = !prevAsc;
            setDeals(prevDeals => ordenarDeals(prevDeals, nuevoAsc));
            return nuevoAsc;
        });
    };

    return (
        <div className="d-flex flex-column">
            {loading ? (
                <div className="m-auto mt-3">
                    <Grid className="m-auto" speed="0.7" size="250" color="#3b89ffff" />
                </div>
                ):(
                <>
                    <div className="d-flex ms-5 me-5 align-items-center justify-content-between">
                        <Button onClick={ordenar} className="ascDesc m-3 fs-2 p-0">
                            {ordenAscendente ? "↓" : "↑"}
                        </Button>
                        <input type="text" name="searchBar" id="searchBar" placeholder="... search ..." className="text-center" onChange={searchText}/>
                    </div>
                    {filteredDeals.map((deal) => (
                        <Deal deal={deal} key={deal.id} setFecha={addFecha} dealSinTask={dealSinTask}/>
                    ))}
                </>
            )}
        </div>
    );
}