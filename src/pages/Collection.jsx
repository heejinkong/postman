import React, { useEffect, useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function CollectionEditor(props) {
  const { workspaceId, collectionId } = useParams();
  const { collectionData, setCollectionData } = useData();
  const [isEditingDescription, setEditingDescription] = useState(false);

  //컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    //해당 collection이 로컬스토리지에 존재할 경우
    if (collectionId !== ':collectionId') {
      const collectionData = localStorage.getItem(
        `collection-${workspaceId}-${collectionId}`
      );
      const collection = collectionData ? JSON.parse(collectionData) : null;

      if (collection) {
        setCollectionData(collection);
      }
    } else {
      //collection을 새로 만들 경우
      let maxId = 0;
      for (let i = 1; i <= localStorage.length; i++) {
        const key = localStorage.key(i);
        //collection 데이터인 경우
        if (key && key.startsWith(`collection-${workspaceId}-`)) {
          //collection의 Id를 파싱
          const id = parseInt(
            key.replace(`collection-${workspaceId}-`, ''),
            10
          );
          //Id가 유효하고, maxId보다 클경우
          if (!isNaN(id) && id > maxId) {
            maxId = id;
          }
        }
      }

      const nextId = maxId + 1;

      setCollectionData({ id: nextId, name: '', description: '' });

      // ID가 null인 경우에만 새로운 ID를 설정
      // if (collectionData.id === 0) {
      //   const nextId = maxId + 1;
      //   setCollectionData((prevData) => ({
      //     ...prevData,
      //     id: nextId,
      //   }));
      // }
    }
  }, [collectionData.id, collectionId, setCollectionData, workspaceId]);

  //collection 이름 변경될 때
  const handleNameChange = (e) => {
    const newCollectionName = e.target.value;
    setCollectionData((prevData) => ({
      ...prevData,
      collectionname: newCollectionName,
    }));
    //변경된 데이터 로컬스토리지에 저장
    saveCollectionDataToLocalStorage({
      ...collectionData,
      collectionname: newCollectionName,
    });
  };

  //description 변경될 때
  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setCollectionData((prevData) => ({
      ...prevData,
      collectiontext: newDescriptionText,
    }));
    //변경된 데이터 로컬스토리지에 저장
    saveCollectionDataToLocalStorage({
      ...collectionData,
      collectiontext: newDescriptionText,
    });
  };

  // const handleDescriptionBlur = () => {
  //   setEditingDescription(false);
  //   saveCollectionDataToLocalStorage(collectionData);
  // };

  //description 편집하기 위한 버튼 클릭
  const handleNotesClick = () => {
    //편집 모드 활성화
    setEditingDescription(true);
  };

  //collection 로컬스토리지에 저장
  const saveCollectionDataToLocalStorage = (data) => {
    if (data.id !== 0) {
      localStorage.setItem(
        `collection-${workspaceId}-${data.id}`,
        JSON.stringify(data)
      );
    }
  };

  //저장 버튼 클릭 시
  const handleSave = (e) => {
    e.preventDefault();

    // 기존에 사용된 ID 중 가장 큰 ID를 찾아서 그 다음 ID를 설정
    let maxId = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`collection-${workspaceId}-`)) {
        const id = parseInt(key.replace(`collection-${workspaceId}-`, ''), 10);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      }
    }

    const newId = maxId + 1;

    // 새로운 collection 데이터 생성 및 저장
    const collection = {
      id: newId,
      collectionname: collectionData.collectionname,
      collectiontext: collectionData.collectiontext,
      date: Date.now(),
      workspaceId: workspaceId,
    };

    localStorage.setItem(
      `collection-${workspaceId}-${newId}`, // 변경: `collection-${workspaceId}-${collection.id}` 대신 `collection-${workspaceId}-${newId}`
      JSON.stringify(collection)
    );

    const newUrl = `/workspaces/${workspaceId}/collections/${newId}`; // 변경: collection.id 대신 newId 사용
    window.location.href = newUrl;
  };

  return (
    <div>
      <div className="collection_editor_container">
        <div className="collection_path_container">
          <div className="collection_path_title">
            <input
              type="text"
              value={collectionData.collectionname}
              onChange={handleNameChange}
              placeholder="New Collection"
            />
          </div>
          <div className="collection_save_container">
            <div className="collection_save_btn">
              {collectionData.id === 0 ? (
                <Button
                  variant="outlined"
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                  size="big"
                >
                  Save
                </Button>
              ) : (
                <Link
                  to={`/workspaces/${workspaceId}/collection/${collectionData.id}?isForEdit=true`}
                ></Link>
              )}
            </div>
          </div>
        </div>
        <div className="collection_description">
          <div className="collection_title">
            <textarea
              value={collectionData.collectionname}
              onChange={handleNameChange}
              style={{ fontWeight: 'bold' }}
              placeholder="New Collection"
            ></textarea>
          </div>
          <div
            className="collection_description_notes"
            onClick={handleNotesClick}
          >
            {isEditingDescription ? (
              <textarea
                value={collectionData.collectiontext}
                onChange={handleDescriptionChange}
                // onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>
                {collectionData.collectiontext ||
                  'Make things easier for your teammates with a complete collection description.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
