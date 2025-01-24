import React, { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading, 
        language, 
        setLanguage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;