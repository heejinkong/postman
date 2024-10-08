import React from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

export default function BodyParams() {
  const { collectionId, requestName } = useParams();
  const { paramsData, updateParamsData, checked, dataRows, setDataRows } =
    useData();

  //   const addRow = () => {
  //     setDataRows([
  //       ...dataRows,
  //       { key: '', value: '', description: '', checked: false },
  //     ]);
  //   };

  //   const handleInputChange = (e, index, field) => {
  //     const newValue = e.target.value;
  //     const updatedDataRows = [...dataRows];
  //     updatedDataRows[index][field] = newValue;
  //     setDataRows(updatedDataRows);

  //     if (index === updatedDataRows.length - 1 && newValue !== '') {
  //       addRow();
  //     }
  //   };

  //   const deleteRow = (index) => {
  //     const updatedDataRows = [...dataRows];
  //     updatedDataRows.splice(index, 1);
  //     updateParamsData(updatedDataRows);
  //     setDataRows(updatedDataRows);
  //   };

  //   const handleDataRowChange = (e, index) => {
  //     const newChecked = e.target.checked;
  //     const updatedDataRows = [...dataRows];
  //     updatedDataRows[index] = { ...updatedDataRows[index], checked: newChecked };
  //     updateParamsData(updatedDataRows);
  //     setDataRows(updatedDataRows);
  //   };

  // useEffect(() => {
  //   setDataRows(dataRows);
  // }, [requestName, dataRows, setDataRows]);

  // console.table(paramsData);

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

          <div className="params_editor_key_header_row">
            <div className="params_form_header_row"></div>
            <div className="params_header_row">
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.key}
                  //   onChange={(e) => handleInputChange(e, index, 'key')}
                  placeholder="Key"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.value}
                  //   onChange={(e) => handleInputChange(e, index, 'value')}
                  placeholder="Value"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={paramsData.description}
                  //   onChange={(e) =>
                  //     handleInputChange(e, index, 'description')
                  //   }
                  placeholder="Description"
                />
              </div>
            </div>

            <IconButton
              aria-label="delete"
              // onClick={() => deleteRow(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
