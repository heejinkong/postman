import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Runner = () => {
  const { workspaceId, collectionId } = useParams();
  const { collectionData, setCollectionData, requestItems } = useData();

  const [requestList, setRequestList] = useState([]); // 요청 목록을 저장할 상태

  // 컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    // 해당 collection이 로컬스토리지에 존재할 경우
    if (collectionId !== ':collectionId') {
      const collectionData = localStorage.getItem(
        `collection-${workspaceId}-${collectionId}`
      );
      const collection = collectionData ? JSON.parse(collectionData) : null;

      if (collection) {
        setCollectionData(collection);
      }
    }

    // requestItems에서 현재 collectionId에 해당하는 항목만 가져오기
    const currentRequestList = requestItems[collectionId] || [];
    setRequestList(currentRequestList);
  }, [collectionId, setCollectionData, workspaceId, requestItems]);

  console.log(requestItems[collectionId]);

  return (
    <div>
      <span>Run order</span>
      <div>
        <List component="nav">
          {requestList.map((item, index) => (
            <ListItem key={index}>
              <Checkbox {...label} defaultChecked />
              <ListItemText primary={item.data.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <button>Run {collectionData.collectionname}</button>
    </div>
  );
};

export default Runner;
