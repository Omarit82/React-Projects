import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [ usuario,setUsuario ] = useState(undefined);

   

    const setLogin = (data) => {
        setUsuario(data);
    }
    
    const getSession = async() => {
        try {
            const session = await fetch('http://localhost:3000/api/session',{
                method:'GET',
                credentials:'include'
            });            
            if(session.status == 200){
                const respuesta = await session.json();
                console.log(respuesta);
                if(respuesta.Session.hubspotToken){
                    return true;
                }else{
                    return false;
                }
            }          
        } catch (error) {
            console.log("Error al obtener la session");
        }
            
    }
    

    const logOut = async () => {
        const loginOut  = await fetch('http://localhost:3000/logout',{
            method:'POST', //?
            credentials:'include'
        });
        setUsuario(null);
    }
    const values ={setLogin,logOut,usuario,getSession};

    return(
        <UserContext.Provider value={values} >
            {children}
        </UserContext.Provider>
    )
}