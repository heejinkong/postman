import React, { useState, useEffect } from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

export default function QueryParams() {
  const { requestName, collectionId } = useParams();
  const { updateParamsData, checked, dataRows, setDataRows } = useData();

  const addRow = () => {
    setDataRows((prevDataRows) => [
      ...prevDataRows,
      { key: '', value: '', description: '', checked: false },
    ]);
  };

  const handleInputChange = (e, index, field) => {
    const newValue = e.target.value;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index][field] = newValue;
    setDataRows(updatedDataRows);

    if (index === updatedDataRows.length - 1 && newValue !== '') {
      addRow();
    }
  };

  const deleteRow = (index) => {
    const updatedDataRows = [...dataRows];
    updatedDataRows.splice(index, 1);
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);

    // 삭제한 행 업데이트
    const paramsDataKey = `paramsData-${collectionId}-${requestName}`;
    localStorage.setItem(paramsDataKey, JSON.stringify(updatedDataRows));
  };

  const handleDataRowChange = (e, index) => {
    const newChecked = e.target.checked;
    const updatedDataRows = [...dataRows];
    updatedDataRows[index] = { ...updatedDataRows[index], checked: newChecked };
    updateParamsData(updatedDataRows);
    setDataRows(updatedDataRows);
  };

  useEffect(() => {
    // 로컬 스토리지에서 해당 request의 파라미터 데이터를 불러옵니다.
    const paramsDataKey = `paramsData-${collectionId}-${requestName}`;
    const storageParamsData = localStorage.getItem(paramsDataKey);
    if (storageParamsData) {
      setDataRows(JSON.parse(storageParamsData));
    }
  }, [requestName, collectionId, setDataRows]);

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
            <div className="params_editor_key_header_row" key={index}>
              <div className="params_form_header_row"></div>
              <div className="params_header_row">
                <Checkbox
                  checked={Boolean(rowData.checked) || checked}
                  onChange={(e) => handleDataRowChange(e, index)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  size="small"
                />

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
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteRow(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
