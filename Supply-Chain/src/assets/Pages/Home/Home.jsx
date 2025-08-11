import { DealsContainer } from "../../Components/DealsContainer/DealsContainer";


export const Home = () => {
    return(
        <main>
            <h2 className="text-center">Deals</h2>
            <DealsContainer task={67052576} completed={false}  />
        </main>
    )
}