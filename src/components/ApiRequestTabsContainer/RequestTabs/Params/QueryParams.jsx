import React, { useEffect, useState } from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

export default function QueryParams() {
  const { collectionId, requestName } = useParams();
  const { paramsData, updateParamsData, checked } = useData();

  const handleKeyChange = (e) => {
    const newKey = e.target.value;
    const newParamsData = { ...paramsData, key: newKey };
    updateParamsData(newParamsData);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    const newParamsData = { ...paramsData, value: newValue };
    updateParamsData(newParamsData);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    const newParamsData = { ...paramsData, description: newDescription };
    updateParamsData(newParamsData);
  };

  // const handleKeyChange = (e) => {
  //   const newKey =e.target.value;
  //   setParamsData((prevDate) => ({
  //     ...prevDate,
  //     key: newKey,
  //   }));
  // };

  // const handleValueChange = (e) => {
  //   const newValue = e.target.value;
  //   setParamsData((prevDate) => ({
  //     ...prevDate,
  //     value: newValue,
  //   }));
  // };

  // const handleDescriptionChange = (e) => {
  //   const newDescription = e.target.value;
  //   setParamsData((prevDate) => ({
  //     ...prevDate,
  //     description: newDescription,
  //   }))

  // };

  // console.log(paramsData);

  return (
    <div className="params_editor_container">
      <div className="params_editor_header_row">
        <div className="params_editor_top_header">
          <div className="params_editor_key_header_row ">
            <div className="params_form_header_row"></div>
            <div className="params_header_row">
              <div className="param_row">Key</div>
              <div className="param_row">Value</div>
              <div className="param_row">Description</div>
            </div>
          </div>
          <div
            className="params_editor_key_header_row "
            style={{ borderTop: 'none' }}
          >
            <div className="params_form_header_row"></div>
            <div className="params_header_row">
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.key}
                  onChange={handleKeyChange}
                  placeholder="Key"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.value}
                  onChange={handleValueChange}
                  placeholder="Value"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  placeholder="Description"
                />
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
