import React, { useEffect, useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { collectionActions } from '../slice/collectionSlice';
import { Link ,useParams, useLocation } from 'react-router-dom';


export default function CollectionEditor(props) {
  const { workspaceId, collectionId } = useParams();
  const [collectionData, setCollectionData] = useState({
    id: 0,
    collectionname: "",
    collectiontext:"",
    date: Date.now(),
    collections: [],
    workspaceId: 0,
  });
  const [isEditingDescription, setEditingDescription] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (collectionId !== ':collectionId') {
      const collectionData = localStorage.getItem(`collection-${collectionId}`);
      const collection = collectionData ? JSON.parse(collectionData) : null;
  
      if (collection) {
        setCollectionData(collection);
      }
    } else {
      // 기존에 사용된 ID 중 가장 큰 ID를 찾아서 그 다음 ID를 설정
      let maxId = 0;
      for (let i = 1; i <= localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('collection-')) {
          const id = parseInt(key.replace('collection-', ''), 10);
          if (!isNaN(id) && id > maxId) {
            maxId = id;
          }
        }
      }
  
      const nextId = maxId + 1;
  
      setCollectionData({ id: nextId, collectionname: '', collectiontext: '' });
    }
  }, [collectionId]);
 
  const handleNameChange = (e) => {
    const newCollectionName = e.target.value;
    setCollectionData((prevData) => ({
      ...prevData,
      collectionname: newCollectionName,
    }));
    saveCollectionDataToLocalStorage({
      ...collectionData,
      collectionname: newCollectionName,
    });
  };

  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setCollectionData((prevData) => ({
      ...prevData,
      collectiontext: newDescriptionText,
    }));
    saveCollectionDataToLocalStorage({
      ...collectionData,
      collectiontext: newDescriptionText,
    });
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
    saveCollectionDataToLocalStorage(collectionData);
  };

  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  const saveCollectionDataToLocalStorage = (data) => {
    localStorage.setItem(`collection-${data.id}`, JSON.stringify(data));
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    // 기존에 사용된 ID 중 가장 큰 ID를 찾아서 그 다음 ID를 설정
    let maxId = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('collection-')) {
        const id = parseInt(key.replace('collection-', ''), 10);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      }
    }
  
    const newId = maxId + 1;
  
    const collection = {
      id: newId,
      collectionname: collectionData.collectionname,
      collectiontext: collectionData.collectiontext,
      date: Date.now(),
      collections: [],
      workspaceId: workspaceId,
    };
  
    localStorage.setItem(`collection-${collection.id}`, JSON.stringify(collection));

    const newUrl = `/workspace/${workspaceId}/collection/${collection.id}`;
  window.location.href = newUrl;
  };
  

  
  const collections = useSelector((state) => state.collectionReducers.collections);


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
            {collectionData.id > 0 ? (
              <Link
                to={`/workspace/${workspaceId}/collection/${collectionData.id}?isForEdit=true`}
              ></Link>
            ) : (
              <button onClick={handleSave}>
                Save
                <SaveIcon />
              </button>
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
        <div className="collection_description_notes" onClick={handleNotesClick}>
          {isEditingDescription ? (
            <textarea
              value={collectionData.collectiontext}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
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
