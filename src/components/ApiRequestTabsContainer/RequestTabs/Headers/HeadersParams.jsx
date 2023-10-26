import React, { useEffect } from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

function HeadersParams() {
  const { collectionId, requestName } = useParams();
  const {
    updateHeadersParamsData,
    checkedHeaders,
    HeadrsDataRows,
    setHeadersDataRows,
  } = useData();

  const addRow = () => {
    setHeadersDataRows((prevDataRows) => [
      ...prevDataRows,
      { key: '', value: '', description: '', checked: false },
    ]);
  };

  const handleInputChange = (e, index, field) => {
    const newValue = e.target.value;
    const updatedHeadersDataRows = [...HeadrsDataRows];
    updatedHeadersDataRows[index][field] = newValue;
    setHeadersDataRows(updatedHeadersDataRows);

    if (index === updatedHeadersDataRows.length - 1 && newValue !== '') {
      addRow();
    }
  };

  const deleteRow = (index) => {
    const updatedHeadersDataRows = [...HeadrsDataRows];
    updatedHeadersDataRows.splice(index, 1);
    updateHeadersParamsData(updatedHeadersDataRows);
    setHeadersDataRows(updatedHeadersDataRows);

    // 삭제한 행 업데이트
    const HeadersParamsDataKey = `HeadersparamsData-${collectionId}-${requestName}`;
    localStorage.setItem(
      HeadersParamsDataKey,
      JSON.stringify(updatedHeadersDataRows)
    );
  };

  const handleDataRowChange = (e, index) => {
    const newChecked = e.target.checked;
    const updatedHeadersDataRows = [...HeadrsDataRows];
    updatedHeadersDataRows[index] = {
      ...updatedHeadersDataRows[index],
      checked: newChecked,
    };
    updateHeadersParamsData(updatedHeadersDataRows);
    setHeadersDataRows(updatedHeadersDataRows);
  };

  useEffect(() => {
    // 로컬 스토리지에서 해당 request의 파라미터 데이터를 불러옵니다.
    const HeadersParamsDataKey = `HeadersparamsData-${collectionId}-${requestName}`;
    const storageHeadersParamsData = localStorage.getItem(HeadersParamsDataKey);
    if (storageHeadersParamsData) {
      setHeadersDataRows(JSON.parse(storageHeadersParamsData));
    }
  }, [requestName, collectionId, setHeadersDataRows]);

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
          {HeadrsDataRows.map((rowData, index) => (
            <div className="params_editor_key_header_row" key={index}>
              <div className="params_form_header_row"></div>
              <div className="params_header_row">
                <Checkbox
                  checked={Boolean(rowData.checked) || checkedHeaders}
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

export default HeadersParams;
