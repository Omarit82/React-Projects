import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [ usuario,setUsuario ] = useState();


    const infoLogin = (data) => {
        setUsuario(data);
        console.log(data);
    }

    const logOut = ()=>{
        setUsuario();
    }
    const values ={infoLogin,logOut,usuario};

    return(
        <UserContext.Provider value={values} >
            {children}
        </UserContext.Provider>
    )
}