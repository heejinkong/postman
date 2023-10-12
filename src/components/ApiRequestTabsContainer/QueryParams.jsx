import React, { useState } from 'react';
import '../../style/queryparams.scss';
import { useData } from '../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function QueryParams() {
  const { paramsData, updateParamsData } = useData();
  const [dataRows, setDataRows] = useState([paramsData]);

  const handleKeyChange = (e, index) => {
    const newKey = e.target.value;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index] = { ...updatedDataRows[index], key: newKey };
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);
    newRow(index, updatedDataRows);
  };

  const handleValueChange = (e, index) => {
    const newValue = e.target.value;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index] = { ...updatedDataRows[index], value: newValue };
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);
    newRow(index, updatedDataRows);
  };

  const handleDescriptionChange = (e, index) => {
    const newDescription = e.target.value;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index] = {
      ...updatedDataRows[index],
      description: newDescription,
    };
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);
    newRow(index, updatedDataRows);
  };

  const newRow = (index, data) => {
    if (
      index === data.length - 1 &&
      (data[index].key || data[index].value || data[index].description)
    ) {
      data.push({ key: '', value: '', description: '' });
      updateParamsData(data);
      setDataRows(data);
    }
  };

  const deleteRow = (index) => {
    const updatedDataRows = [...dataRows];
    updatedDataRows.splice(index, 1);
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);
  };

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
          {dataRows.map((rowData, index) => (
            <div className="params_editor_key_header_row" key={index}>
              <div className="params_form_header_row"></div>
              <div className="params_header_row">
                {rowData.key || rowData.value || rowData.description !== '' ? (
                  <Checkbox {...label} defaultChecked />
                ) : (
                  ''
                )}
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.key}
                    onChange={(e) => handleKeyChange(e, index)}
                    placeholder="Key"
                  />
                </div>
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.value}
                    onChange={(e) => handleValueChange(e, index)}
                    placeholder="Value"
                  />
                </div>
                <div className="param_input_row">
                  <input
                    className="param_row"
                    type="text"
                    value={rowData.description}
                    onChange={(e) => handleDescriptionChange(e, index)}
                    placeholder="Description"
                  />
                </div>
              </div>
              {!rowData.key && !rowData.value && !rowData.description ? (
                ''
              ) : (
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteRow(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
