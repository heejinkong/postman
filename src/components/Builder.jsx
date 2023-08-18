import React from 'react';
import '../style/builder.scss';
import { Button, FormControl, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

export default function Builder() {
  const [method, setMethod] = React.useState('');

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div className='builder_container'>
      <div className='builder_list'>test</div>
      <div className='file_actions'>
        <div className='file_path'>
         
        </div>
        <button className='box_btn_save'>
          <div className='icon_text_container'>
            <div className='icon_btn_save'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="20" height="20">
                <title>content-save</title>
                <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" fill='#afafaf' />
              </svg>
            </div>
            <div className='text_btn_save'>Save</div>
          </div>
        </button>
      </div>
      <div className='builder_body'>
        <div className='body_box_top'>
          <div className='method_options_container'>
            <div className='box_method_url'>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ minWidth: 125, height: '80%' }} size='small'>
                <Select
                  value={method}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>GET</em>
                  </MenuItem>
                  <MenuItem value={10}>POST</MenuItem>
                  <MenuItem value={20}>PUT</MenuItem>
                  <MenuItem value={30}>PATCH</MenuItem>
                  <MenuItem value={40}>DELETE</MenuItem>
                </Select>
              </FormControl>

              <Box component="form" noValidate autoComplete="off">
                <FormControl sx={{ marginRight:'200px',  width: '150ch' }} size='small'>
                  <OutlinedInput placeholder='Enter URL or paste text' />
                </FormControl>
              </Box>
             </Stack>
            </div>
            <div className='btn_send'>
              
                <Button variant='contained' startIcon={<SendIcon />}>
                  Send
                </Button> 

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
