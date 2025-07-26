import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [ usuario,setUsuario ] = useState(undefined);


    const setLogin = (data) => {
        setUsuario(data);
    }
    

    const logOut = async () => {
        const loginOut  = await fetch('http://localhost:3000/logout',{
            method:'POST', //?
            credentials:'include'
        });
        setUsuario(null);
    }
    const values ={setLogin,logOut,usuario};

    return(
        <UserContext.Provider value={values} >
            {children}
        </UserContext.Provider>
    )
}