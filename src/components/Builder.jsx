import React, { useState } from 'react';
import '../style/builder.scss';
import { Button, FormControl, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ApiRequestTabs from './ApiRequestTabsContainer/ApiRequestTabs';





export default function Builder() {
  const [method, setMethod] = useState('');

  // 이건 get/ put / delete 등을 선택하면 setMethod 함수에 저장
  const handleChange = async (event) => {
    await setMethod(event.target.value);
  };

  // // 통신에 필요한 버튼 함수.
  // const sendUrl = async () => {
  //   try {
  //     const response = await axios({
  //       method : method,
  //       url : '/listing',
  //     })
  //     console.log(response.data);
  //     setResponseData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     console.log("Method 통신 잘못되었음.");
  //   }
  // }

 
  return (
    <div className='builder_container'>
      <div className='builder_file_path'>path</div>
      <div className='file_actions'>
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
                  <MenuItem value=''> 
                    <em>Method</em>

                  </MenuItem>
                  <MenuItem value={'get'}>GET</MenuItem>
                  <MenuItem value={'post'}>POST</MenuItem>
                  <MenuItem value={'put'}>PUT</MenuItem>
                  <MenuItem value={'patch'}>PATCH</MenuItem>
                  <MenuItem value={'delete'}>DELETE</MenuItem>
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
                <Button variant='contained' startIcon={<SendIcon />} size='big' >
                  Send
                </Button> 
            </div>
          </div>
        </div>
        <div className='box_request_tab'>
            <ApiRequestTabs/>
        </div>

      </div>
    </div>
  );
}
