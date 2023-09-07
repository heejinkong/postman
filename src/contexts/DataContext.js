import { createContext, useContext, useState } from 'react';

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [resultText, setResultText] = useState('');
  const [resultData, setResultData] = useState('');

  const setResult = (data) => {
    setResultData(data);
  };

  const setTextInput = (text) => {
    setResultText(text);
  };

  return (
    <DataContext.Provider value={{ resultText, resultData, setResult, setTextInput }}>
      {children}
    </DataContext.Provider>
  );
}
