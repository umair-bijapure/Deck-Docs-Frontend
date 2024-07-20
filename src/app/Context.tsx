import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of the context data
interface MyContextType {
  data: Record<string, any>; // Store a generic object
  setData: (data: Record<string, any>) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>({
    // Initialize with an empty object or any initial data you need
  });

  return (
    <MyContext.Provider value={{ data, setData }}>{children}</MyContext.Provider>
  );
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
