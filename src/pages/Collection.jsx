import React, { useEffect, useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useDispatch, useSelector } from 'react-redux';
import { collectionActions } from '../slice/collectionSlice';

export default function Collection(props) {
  const { workspaceId, collectionId } = useParams();
  const [collectionName, setCollectionName] = useState('');
  const [collectionText, setCollectionText] = useState('');
  const [nextId, setNextId] = useState(null);
  const [isEditingDescription, setEditingDescription] = useState(false);
  const dispatch = useDispatch();

  const { collectionname, collectiontext } = useSelector((state) => ({
    collectionname: state.collectionReducers.collectionname,
    collectiontext: state.collectionReducers.collectiontext,
  }));

  useEffect(() => {
    if (collectionname !== undefined && collectionname !== null) {
      setCollectionName(collectionname);
    }
    if (collectiontext !== undefined && collectiontext !== null) {
      setCollectionText(collectiontext);
    }
  }, [collectionname, collectiontext]);
  console.log(collectionId);

  //컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    if (collectionId !== ':collectionId') {
      dispatch(collectionActions.getCollection(collectionId));
    } else {
      let maxId = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`collection-${workspaceId}-`)) {
          const id = parseInt(
            key.replace(`collection-${workspaceId}-`, ''),
            10
          );
          if (!isNaN(id) && id > maxId) {
            maxId = id;
          }
        }
      }
      const nextIdValue = maxId + 1;
      setNextId(nextIdValue);
    }
  }, [workspaceId, dispatch, collectionId]);

  //collection 이름 변경될 때
  const handleNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  //description 변경될 때
  const handleDescriptionChange = (e) => {
    setCollectionText(e.target.value);
  };

  //description 편집하기 위한 버튼 클릭
  const handleNotesClick = () => {
    //편집 모드 활성화
    setEditingDescription(true);
  };

  //저장 버튼 클릭 시
  const handleSave = (e) => {
    e.preventDefault();

    //로컬스토리지에 workspace가 존재할 경우
    if (collectionId !== `:collectionId`) {
      const updatedcollection = {
        id: collectionId,
        name: collectionName,
        description: collectionText,
        workspaceId: workspaceId,
      };
      dispatch(collectionActions.registerCollection(updatedcollection));
    } else {
      const collection = {
        id: nextId,
        name: collectionName,
        description: collectionText,
        workspaceId: workspaceId,
      };
      // 새로운 workspace를 만들 경우
      dispatch(collectionActions.registerCollection(collection));
    }
  };

  useEffect(() => {
    dispatch(collectionActions.getCollection(workspaceId));
  }, [dispatch, workspaceId]);

  return (
    <div>
      <div className="collection_editor_container">
        <div className="collection_path_container">
          <div className="collection_path_title">
            <input
              name="collectiontitle"
              value={collectionName}
              onChange={handleNameChange}
              placeholder="New Collection"
            />
          </div>
          <div className="collection_save_container">
            <div className="collection_save_btn">
              <Button
                variant="outlined"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                size="big"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="collection_description">
          <div className="collection_title">
            <textarea
              value={collectionname}
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
                name="description"
                value={collectionText}
                onChange={handleDescriptionChange}
                // onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>
                {collectiontext ||
                  'Make things easier for your teammates with a complete collection description.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
