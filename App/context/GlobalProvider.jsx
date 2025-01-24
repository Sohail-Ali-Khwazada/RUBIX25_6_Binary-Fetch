import React, { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flagAchievements, setFlagAchievements] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        flagAchievements,
        setFlagAchievements
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;