import { onAuthStateChanged } from "firebase/auth";
import { createContext,useContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase/Firebase";

const AthContext=createContext(null)
export const userAuth=()=>useContext(AthContext)

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])
    return(
        <AthContext.Provider value={{user}}>
            {children}
        </AthContext.Provider>
    )
}