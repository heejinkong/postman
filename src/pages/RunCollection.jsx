import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useParams } from 'react-router-dom';
import CreateRequest from '../components/RunContainer/CreateRequest';
import Runner from '../components/RunContainer/Runner';

const RunnerCollection = () => {
  const { workspaceId, collectionId } = useParams();
  const { requestItems, setCollectionData } = useData();

  const [requestList, setRequestList] = useState([]);

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
    const requestList = requestItems[collectionId] || [];
    setRequestList(requestList);
  }, [collectionId, setCollectionData, workspaceId, requestItems]);

  console.log(requestList);

  return (
    <div>
      <span>Run order</span>
      {requestList.length !== 0 ? <Runner /> : <CreateRequest />}
    </div>
  );
};

export default RunnerCollection;
