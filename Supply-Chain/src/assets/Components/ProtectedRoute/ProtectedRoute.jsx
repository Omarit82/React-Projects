import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext/UserContext"
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({children}) => {  
    const {usuario}=useContext(UserContext);
   
    if (!usuario) {
        return <Navigate to="/login" />;
    }

    return children;
    
}