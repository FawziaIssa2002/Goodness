import { createContext } from 'react';
import { MyContext } from './MyContext';
import { useState, useEffect } from 'react';

const MyProvider = ({ children }) => {
    const [myVariable, setMyVariable] = useState('');
    return (
        <MyContext.Provider value={{ myVariable, setMyVariable }}>
          {children}
        </MyContext.Provider>
      );
    }
    
export default MyProvider;