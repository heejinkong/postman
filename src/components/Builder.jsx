import React, { useEffect, useState } from 'react';
import '../style/builder.scss';
import { Button, FormControl, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ApiRequestTabs from './ApiRequestTabsContainer/ApiRequestTabs';
import axios from 'axios';
import { useData } from '../contexts/DataContext';

export default function Builder() {
  const [method, setMethod] = useState(''); 
  const [url, setUrl] = useState(''); 
  const { setResult, paramsData } = useData();
  const [name, setName] = useState('New Request');
  const { key, value } = paramsData;
  const [queryString, setQueryString] =useState(key && value ? `${key}=${value}` : '');
  const fullUrl = url + (queryString ? `?${queryString}` : '');

  const updateQueryString = () => {
    setQueryString(key && value ? `${key}=${value}` : '');
  };

  // const queryString = key && value ? `${key}=${value}` : '';
  // const fullUrl = url + (queryString ? `?${queryString}` : '');

  // const [queryParams, setQueryParams] = useState([]);
  // const queryString = queryParams.map(param => `${key}=${value}`).join('&');
  
  // const [requestData, setRequestData] = useState({
  //   id: 0, 
  //   name: "New Request",
  //   request: "",
  // });

  useEffect(() => {
    updateQueryString();
  }, [key, value]);

  useEffect(() => {
    updateQueryString();
  }, [url, queryString]);

  console.log(fullUrl)
  // 메서드 변경 
  const handleChangeMethod = (e) => {
    setMethod(e.target.value);
  };

  // URL 입력
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };


  // Send 버튼 클릭 
  const handleSendClick = async () => {
    try {
      const response = await axios({
        method: method, // 선택한 메서드
        url: fullUrl, // 입력한 URL
      });
      console.log(response.data); 
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className='builder_container'>
      <div className='builder_file_path'>
      <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
      </div>
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
                    onChange={handleChangeMethod}
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
                  <FormControl sx={{ marginRight: '200px', width: '127ch' }} size='small'>
                    <OutlinedInput
                      type="text"
                      value={fullUrl}
                      onChange={handleChangeUrl}
                      placeholder='Enter URL or paste text'
                    />
                  </FormControl>
                </Box>
              </Stack>
            </div>
            <div className='btn_send'>
              <Button
                variant='contained'
                startIcon={<SendIcon />}
                size='big'
                onClick={handleSendClick}
              >
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
