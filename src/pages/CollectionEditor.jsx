import React, { useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { collectionActions } from '../slice/collectionSlice';
import { useParams } from 'react-router-dom';


export default function CollectionEditor(props) {
  const dispatch =  useDispatch();
  const { workspaceId } = useParams();
  const [collectionName, setCollectionName] = useState('New Collection');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [collectionText, setCollectionText] = useState('');


  const { id ,collectionname, collectiontext } = useSelector(
    (state) => ({
    id: state.workspaceReducers.id,
    collectionname: state.collectionReducers.collectionname,
    collectiontext: state.collectionReducers.collectiontext,
  }),
  shallowEqual
  );

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
      workspaceId: id,
    };
    console.log(workspaceId);
    dispatch(collectionActions.registerCollection(collection));
  };

  console.log(collectionName);
  console.log(collectionText);
  return (
    <div>
      <div className='collection_editor_container'>
        <div className='collection_path_container'>
            <div className='collection_path_title'>
                <input
                type='text'
                value={collectionName}
                onChange={handleNameChange}
          />
             </div>
             <div className='collection_save_container'>
                <div className='collection_save_btn'>
                <Button variant='outlined' onClick={handleSave} startIcon={<SaveIcon />} size='big'>
            Save
          </Button> 
                </div>

             </div>
         </div>
        <div className='collection_description'>
          <div className='collection_title'>
            <textarea
              value={collectionName}
              onChange={handleNameChange}
              style={{ fontWeight: 'bold' }}
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
