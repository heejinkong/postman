import React from 'react';
import '../../style/contenttype.scss'
import { FormControl, MenuItem, Select} from '@mui/material';



export default function ContentType() {
    const [method, setMethod] = React.useState('');

    const handleChange = (event) => {
      setMethod(event.target.value);
    };

    return (
        <div className='content_type_container'>
          <FormControl sx={{ minWidth: 40, height: '40%', borderColor: 'transparent', '&:hover': { borderColor: 'transparent' } }} size='small'>
            <Select
              value={method}
              onChange={handleChange}
              displayEmpty
              sx={{ '&:before': { borderColor: 'transparent' }, '&:after': { borderColor: 'transparent' } }}
            >
              <MenuItem value="">
                <em>Text</em>
              </MenuItem>
              <MenuItem value={10}>JavaScript</MenuItem>
              <MenuItem value={20}>JSON</MenuItem>
              <MenuItem value={30}>HTML</MenuItem>
              <MenuItem value={40}>XML</MenuItem>
            </Select>
          </FormControl>
        </div>
      );
      
}
