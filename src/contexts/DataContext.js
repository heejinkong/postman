import { createContext, useContext, useState } from 'react';

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [resultText, setResultText] = useState('');
  const [resultData, setResultData] = useState('');
  const [paramsData, setParamsData] = useState({
    key: "",
    value: "",
    description: "",
  });

  const setResult = (data) => {
    setResultData(data);
  };

  const setTextInput = (text) => {
    setResultText(text);
  };

  const updateParamsData = (newParamsData) => {
    setParamsData(newParamsData);
  };

  return (
    <DataContext.Provider value={{ resultText, resultData, setResult, setTextInput, paramsData, setParamsData, updateParamsData }}>
      {children}
    </DataContext.Provider>
  );
}
