import React from 'react';
import '../../../../style/queryparams.scss';
import { useData } from '../../../../contexts/DataContext';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

export default function headersParams() {
  const headersParams = { key: '', value: '', description: '' };

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
                  value={headersParams.key}
                  placeholder="Key"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={headersParams.value}
                  placeholder="Value"
                />
              </div>
              <div className="param_input_row">
                <input
                  className="param_row"
                  type="text"
                  value={headersParams.description}
                  placeholder="Description"
                />
              </div>
            </div>

            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
