import React, { useEffect, useState } from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

export default function QueryParams() {
  const { collectionId, requestName } = useParams();
  const { paramsData, updateParamsData } = useData();
  const [dataRows, setDataRows] = useState([paramsData]);

  const handleInputChange = (e, index, field) => {
    const newValue = e.target.value;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index][field] = newValue;
    setDataRows(updatedDataRows);

    // Check if the user is typing in the last row and add a new row if needed
    if (index === updatedDataRows.length - 1 && newValue !== '') {
      addRow();
    }
  };

  const deleteRow = (index) => {
    const updatedDataRows = [...dataRows];
    updatedDataRows.splice(index, 1);
    setDataRows(updatedDataRows);
  };

  const addRow = () => {
    setDataRows([...dataRows, { key: '', value: '', description: '' }]);
  };

  return (
    <div className="params_editor_container">
      <div className="params_editor_header_row">
        <div className="params_editor_top_header">
          <div className="params_editor_key_header_row">
            <div className="params_form_header_row"></div>
            <div className="params_header_row">
              <div className="param_row">Key</div>
              <div className="param_row">Value</div>
              <div className="param_row">Description</div>
            </div>
          </div>
          {dataRows.map((rowData, index) => (
            <div
              className="params_editor_key_header_row"
              key={index}
              style={{ borderTop: index === 0 ? 'none' : '' }}
            >
              <div className="params_form_header_row"></div>
              <div className="params_header_row">
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.key}
                    onChange={(e) => handleInputChange(e, index, 'key')}
                    placeholder="Key"
                  />
                </div>
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.value}
                    onChange={(e) => handleInputChange(e, index, 'value')}
                    placeholder="Value"
                  />
                </div>
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.description}
                    onChange={(e) => handleInputChange(e, index, 'description')}
                    placeholder="Description"
                  />
                </div>
              </div>
              <IconButton aria-label="delete" onClick={() => deleteRow(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
