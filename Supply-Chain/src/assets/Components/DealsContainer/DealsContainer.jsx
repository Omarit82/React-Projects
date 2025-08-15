import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { Deal } from "../Deal/Deal";
import { Quantum } from "ldrs/react";
import 'ldrs/react/Quantum.css'
import { Button } from "react-bootstrap";
import './dealsContainer.css';

export const DealsContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const { getSession } = useContext(UserContext);
    const [deals, setDeals] = useState([]);
    const [ordenAscendente, setOrdenAscendente] = useState(true);
    const [search,setSearch] = useState(null);

    const ordenPrioridad = {
        ninguna: 0,
        low: 1,
        media: 2,
        alta: 3,
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

    const searchText = (e) => {
        setSearch(e.target.value);
    }
   
    const filteredDeals = deals.filter(dl =>
        !search || dl.properties.dealname?.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const getDeals = async () => {
            try {
                const sesion = await getSession();
                if (!sesion) {
                    window.location.href = 'http://localhost:3000/hubspot/install';
                } else {
                    const respuesta = await fetch(`http://localhost:3000/hubspot/deals/${props.deal}/${props.completed}`,
                        { method: 'GET', credentials: 'include' }
                    );
                    if (respuesta.ok) {
                        const resultado = await respuesta.json();
                        setDeals(ordenarDeals(resultado.Deals.results, ordenAscendente));
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getDeals();
    }, [props.deal, props.completed]);

    const dealSinTask = (id) => {
        setDeals((prev) => {
            const nuevo = prev.filter((dl) => dl.id !== id);
            return ordenarDeals(nuevo, ordenAscendente);
        });
    };

    const addFecha = (id, fecha,prioridad) => {
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
                    <Quantum className="m-auto" speed="0.7" size="120" color="#005be4ff" />
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
                        <Deal deal={deal} key={deal.id} setFecha={addFecha} dealSinTask={dealSinTask} />
                    ))}
                </>
            )}
        </div>
    );
}