import React, { createContext, useState } from 'react'

export const CalcContext = createContext() 
const CalcProvider = ({children}) => {
    const [calc,SetCalc] = useState({
        sign:"",
        num:0,
        res:0
    })
    const providerValue = {
        calc,SetCalc
    }
  return (  
        <CalcContext.Provider value={providerValue}>
            {children}
        </CalcContext.Provider>
  )
}

export default CalcProvider