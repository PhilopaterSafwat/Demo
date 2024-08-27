import { createContext, useEffect, useState } from "react";


export let UserContext = createContext(null)

export default function UserContextProvider({ children }) {

    const [userData, setuserData] = useState(null)
    
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setuserData(localStorage.getItem('userToken'))
        }
    }, [])

    return <UserContext.Provider value={{ userData, setuserData }}>
        {children}
    </UserContext.Provider>
}