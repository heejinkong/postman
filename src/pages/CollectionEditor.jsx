import React, { useState } from 'react';
import '../style/collectioneditor.scss';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';


export default function CollectionEditor() {
  const [collectionName, setCollectionName] = useState('New Collection');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');

  const handleNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
  };
  const handleNotesClick = () => {
    setEditingDescription(true);
  };

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
                <Button variant='outlined' startIcon={<SaveIcon />} size='big'>
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
                value={descriptionText}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>{descriptionText || 'Make things easier for you teammates with a complete collection description.'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
