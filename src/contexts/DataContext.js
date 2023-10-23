import { createContext, useContext, useEffect, useState } from 'react';

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [workspaceData, setWorkspaceData] = useState({
    id: 0,
    name: 'New workspace',
    description: '',
  });
  const [resultText, setResultText] = useState('');
  const [resultData, setResultData] = useState('');
 const [paramsData, setParamsData] = useState([
  { key: '', value: '', description: '' }
]);

  
  const [checked, setChecked] = useState('');
  const [requestItems, setRequestItems] = useState([]);
  const [items, setItems] = useState([]); 
  const [collectionData, setCollectionData] = useState({
    id: 0,
    collectionname: 'New collection',
    collectiontext: '',
    date: Date.now(),
    workspaceId: 0,
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
  useEffect(() => {
    const loadItemsFromLocalStorage = () => {
      const requestItems = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('request-')) {
          const requestData = JSON.parse(localStorage.getItem(key));
          const collectionId = key.split('-')[1];
          if (!requestItems[collectionId]) {
            requestItems[collectionId] = [];
          }
          requestItems[collectionId].push({
            data: requestData,
          });
        }
      }
      setRequestItems(requestItems);

      // console.table(requestItems[2]);
      
      setItems(requestItems);
    };
    loadItemsFromLocalStorage();
  }, []);

  return (
    <DataContext.Provider value={{ resultText, resultData, setResult, setTextInput, paramsData, setParamsData, updateParamsData, checked, setChecked, requestItems, setRequestItems, items, setItems, collectionData, setCollectionData, workspaceData, setWorkspaceData }}>
      {children}
    </DataContext.Provider>
  );
}
