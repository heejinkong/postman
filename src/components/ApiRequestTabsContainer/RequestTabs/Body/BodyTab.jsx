import React from 'react';
import '../../../../style/bodytab.scss';
import { Radio } from '@mui/material';
import QueryParams from '../Params/QueryParams';
import RawType from './RawType';
import ContentType from './ContentType';

export default function BodyTab() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="body_container">
      <div className="body_request_type">
        <div className="body_request_form">
          <Radio {...controlProps('a')} size="10px" />
          <span>form-data</span>
        </div>
        <div className="body_request_raw">
          <Radio {...controlProps('b')} size="10px" />
          <span>raw</span>
          {selectedValue === 'b' && <ContentType />}
        </div>
      </div>
      <div className="body_editor_container">
        {selectedValue === 'a' ? <QueryParams /> : <RawType />}
      </div>
    </div>
  );
}
