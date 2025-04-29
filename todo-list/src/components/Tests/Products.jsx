import { useState } from "react";

export const Products = () => {
    
    const [pro, setPro] = useState([]);
    const [title, setTitle] = useState("Title");

    const handleProds = async() =>{
        try {
            const products = await fetch('http://localhost:8080/api/products');
            const response = await products.json();
           
            setPro(response.prods.docs)
           
            setTitle(response.prods.docs[0].title);

        } catch (error) {
            console.error("❌", error)
        }
    }


    return (
        <div className="d-flex align-items-center flex-column">
            <h1 className="text-center field m-2 ms-5 me-5">{title}</h1>
            <button className="btn btn-primary" onClick={handleProds}>Get Prods</button>
            {
                pro.map((disco, index) =>(
                    <Card props={index}/>
                ))
            }
        </div>
    )
}