import React, { useEffect, useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { collectionActions } from '../slice/collectionSlice';
import { Link ,useParams, useLocation } from 'react-router-dom';


export default function CollectionEditor(props) {
  const dispatch =  useDispatch();
  const { workspaceId, collectionId } = useParams();
  const [collectionName, setCollectionName] = useState('');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [collectionText, setCollectionText] = useState('');
  const [isForUpdate, setIsForUpdate] = useState(false);
  const location = useLocation();

  const { id ,collectionname, collectiontext } = useSelector(
    (state) => ({
    id: state.collectionReducers.id,
    collectionname: state.collectionReducers.collectionname,
    collectiontext: state.collectionReducers.collectiontext,
  }),
  shallowEqual
  );
console.log(collectionId);
  const handleNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setCollectionText(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
  };
  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const collection = {
      id: 0,
      collectionname: collectionName,
      collectiontext: collectionText,
      date: Date.now(),
      workspaceId: id,
    };

   
      dispatch(collectionActions.registerCollection(collection));

  };

  
  const collections = useSelector((state) => state.collectionReducers.collections);
console.table(collections);


useEffect(() => {
  dispatch(collectionActions.getCollection({ workspaceId, collectionId }));
}, [dispatch,(workspaceId, collectionId)])

useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.get("isForEdit") === "true") {
    setIsForUpdate(true);
    dispatch(collectionActions.fetchCollection(collectionId));
  }
}, [location.search, workspaceId]);



useEffect(() => {
  if (collectionId > 0) {
    setCollectionName(collectionname);
    setCollectionText(collectiontext);
  }
}, [collectionname, collectiontext]);

console.log(workspaceId)
  return (
    <div>
      <div className='collection_editor_container'>
        <div className='collection_path_container'>
            <div className='collection_path_title'>
                <input
                type='text'
                value={collectionName}
                onChange={handleNameChange}
                placeholder='New Collectoin'
          />
             </div>
             <div className='collection_save_container'>
                <div className='collection_save_btn'>
                {collectionId > 0 ? (
          <Link to={`/workspace/${workspaceId}/collection/${collectionId}?isForEdit=true`}></Link>
        ) : (
          <Button variant='outlined' onClick={handleSave} startIcon={<SaveIcon />} size='big'>
          Save
        </Button> 
        )}
                </div>

             </div>
         </div>
        <div className='collection_description'>
          <div className='collection_title'>
            <textarea
              value={collectionName}
              onChange={handleNameChange}
              style={{ fontWeight: 'bold' }}
              placeholder='New Collectoin'
            ></textarea>
          </div>
          <div className='collection_description_notes' onClick={handleNotesClick}>
            {isEditingDescription ? (
              <textarea
                value={collectionText}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>{collectionText || 'Make things easier for you teammates with a complete collection description.'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
