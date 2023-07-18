import { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
