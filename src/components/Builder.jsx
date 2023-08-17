import React from 'react';
import '../style/builder.scss';


export default function Builder() {
  return (
    <div className='builder_container'>
      <div className='builder_list'>test</div>
      <div className='file_actions'>
        <div className='filde_path'>
        test/ new folder
        </div>
        <button className='box_btn_save'>
          <div className='icon_text_container'>
            <div className='icon_btn_save'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="20" height="20">
          <title>content-save</title>
          <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" fill='#afafaf' />
          </svg>
          </div>
          <div className='text_btn_save'>Save</div>
          </div>
        </button>
      </div>
      <div className='builder_body'>
          body
      </div>
    </div>
  );
}