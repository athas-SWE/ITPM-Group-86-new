import React, { createContext, useState } from 'react'

export const adddata = createContext("");
export const updatedata = createContext("");
export const deletedata = createContext("");

const ContextProvider = ({ children }) => {

    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");

    return (
        <adddata.Provider value={{ udata, setUdata }}>
            <updatedata.Provider value={{ updata, setUPdata }}>
                <deletedata.Provider value={{ dltdata, setDLTdata }}>
                    {children}
                </deletedata.Provider>
            </updatedata.Provider>
        </adddata.Provider>
    )
}

export default ContextProvider;