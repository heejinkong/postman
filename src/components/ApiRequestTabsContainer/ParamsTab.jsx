import React from 'react';
import '../../style/paramstab.scss';


export default function ParamsTab() {
    return (
        <div className="params_container">
          <div className='params_editor_title'>
            <span>Query Params</span>
          </div>
          <div className='params_editor_table'>
            <div className='params_editor_header_row'>
                <div className='params_editor_top_header'>
                <div className='params_editor_key_header_row '>
                    key
                </div>
                </div>
            </div>
          </div>
        </div>
      );
    }