import React from 'react';
import '../style/builder.scss';
import { Button, FormControl, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';

export default function Builder() {
  const [method, setMethod] = React.useState('');

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div className='builder_container'>
      <div className='builder_list'>test</div>
      <div className='file_actions'>
        <div className='file_path'>path</div>
        <div className='box_btn_save'>
          <Button variant='outlined' startIcon={<SaveIcon />} size='big'>
            Save
          </Button> 
        </div>
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
                <FormControl sx={{ marginRight:'200px',  width: '127ch' }} size='small'>
                  <OutlinedInput placeholder='Enter URL or paste text' /> 
                </FormControl>
              </Box>
             </Stack>
            </div>
            <div className='btn_send'>
                <Button variant='contained' startIcon={<SendIcon />} size='big'>
                  Send
                </Button> 
            </div>
          </div>
        </div>
        <div className='box_request_tab'>
            request
        </div>
      </div>
    </div>
  );
}
