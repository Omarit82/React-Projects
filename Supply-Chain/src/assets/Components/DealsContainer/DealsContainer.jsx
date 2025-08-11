import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { Deal } from "../Deal/Deal";
import { Quantum } from "ldrs/react";
import 'ldrs/react/Quantum.css'

export const DealsContainer = () => {
    const [loading,setLoading] = useState(true);
    const {getSession} = useContext(UserContext);
    const [deals,setDeals] = useState([]);
   

    useEffect(() => {
        const getDeals = async() => {
            try {
                const sesion =await getSession();
                if(!sesion){
                    window.location.href = 'http://localhost:3000/hubspot/install'
                }else{
                    const deals = await fetch('http://localhost:3000/hubspot/deals',{
                        method:'GET',
                        credentials:'include'
                    });
                    if(deals.status == 200){
                        const resultado = await deals.json();
                        setDeals(resultado.Deals.results);
                        
                    }
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getDeals();
    },[])

    return(
        <div className="d-flex flex-column">
            {
            loading ? <div className="m-auto mt-3"> <Quantum className="m-auto" speed="0.7" size="120" color="#005be4ff" /></div> : deals.map((deal,key)=>{
                return < Deal deal={deal} key={key} />
            })
            }
        </div>
    )
}