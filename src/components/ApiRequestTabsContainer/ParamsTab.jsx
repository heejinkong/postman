import React from 'react';
import '../../style/paramstab.scss';


export default function ParamsTab() {
  return (
    <div className="params_container">
      <div className='params_editor_title'>
        <span>Query Params</span>
      </div>
      <div className='params_editor_container'>
        <div className='params_editor_header_row'>
          <div className='params_editor_top_header'>
            <div className='params_editor_key_header_row '>
              <div className='params_form_header_row'></div>
              <div className='params_header_row'>
                <div className="param_row">Key</div>
                <div className="param_row">Value</div>
                <div className="param_row">Description</div>
              </div>
            </div>
            <div className='params_editor_key_header_row ' style={{ borderTop: 'none' }}>
              <div className='params_form_header_row'></div>
              <div className='params_header_row'>
                <div className="param_input_row">
                  <input className="param_row" type="text" placeholder="Key" />
                </div>
                <div className="param_input_row">
                  <input className="param_row" type="text" placeholder="Value" />
                </div>
                <div className="param_input_row">
                  <input className="param_row" type="text" placeholder="Description" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
