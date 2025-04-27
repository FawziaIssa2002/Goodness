import React, { createContext, useContext, useState } from "react";
import phalastin from '../assets/images/Phalestine.web.png';
import phalastin1 from '../assets/images/phalstin1.png';
import Syria from '../assets/images/سوريا.png';
import child from '../assets/images/يتيم.jpg';
const UserContext = createContext(undefined);
export const UserProvider = ({ children }) => {
    const [DataProject] = useState([
        {
        datatitle : <p>إغاثة الشعب الفلسطيني</p>,
        img :{phalastin},
        tag :{phalastin1},
        class :<p>عامة المجتمع</p>,
        avail :200,
        from :300
    },
    {
        datatitle: <p>مساعدة الأطفال الأيتام</p>,
    img : {child },
    tag : {Syria},
    class : <p> الأطفال الأيتام </p>,
    avail : 89,
    from : 900
}
    ]);
    return <UserContext.Provider value={{ DataProject }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);