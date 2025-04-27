import { createContext, useEffect } from "react";
import { useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }){
    const [windowSize, setWindowSize] = useState(window.innerWidth);
     //when we use addEventListener ..we have to use useeffect to aviod repeetly

     useEffect(() => {
        function setWindowWidth(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', setWindowWidth); 

        // CleanUp function
        return () => {
            window.removeEventListener("resize", setWindowWidth);
        };
     },[]);

    return (
        <WindowSize.Provider value={{ windowSize}}>
            {children}
        </WindowSize.Provider>
    )
} 