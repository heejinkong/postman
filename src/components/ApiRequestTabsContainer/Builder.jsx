import React, { useState, useEffect } from 'react';
import '../../style/builder.scss';
import {
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import ApiRequestTabs from './RequestTabs/ApiRequestTabs';
import axios from 'axios';
import { useData } from '../../contexts/DataContext';
import { useParams, Link } from 'react-router-dom';

export default function Builder() {
  const { workspaceId, collectionId, requestName } = useParams();
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const { setResult, paramsData, collectionData } = useData();
  const [name, setName] = useState('New Request');

  // 기존 URL 뒤에 key=value를 붙이는 함수
  const addUrl = (url, key, value) => {
    return url + (url.includes('?') ? '&' : '?') + `${key}=${value}`;
  };

  // 메서드 변경
  const handleChangeMethod = (e) => {
    setMethod(e.target.value);
  };

  // URL 입력
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  let fullUrl = url;
  paramsData.forEach((dataRow) => {
    if (dataRow.key && dataRow.value && dataRow.checked === true) {
      fullUrl = addUrl(fullUrl, dataRow.key, dataRow.value);
    }
    console.log(dataRow);
    console.log(`URL: ${fullUrl}`);
  });

  const handleSendClick = async () => {
    if (method !== '') {
      try {
        const response = await axios({
          method: method,
          url: fullUrl,
        });
        console.log(method);
        setResult(JSON.stringify(response.data, null, 2));
      } catch (e) {
        setResult(`Error: ${e.message}`);
      }
    } else {
      alert('method를 선택하세요');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (requestName !== `:requestName`) {
      const requestData = localStorage.getItem(
        `request-${collectionId}-${requestName}`
      );
      const request = requestData ? JSON.parse(requestData) : null;
      if (request) {
        setName(request.name);
        setMethod(request.request.method);
        setUrl(request.request.url.raw);
      }
    }
  }, [requestName, collectionId]);

  const handleSaveClick = () => {
    let requestUrl;

    try {
      new URL(fullUrl);
      const key = `request-${collectionId}-${name}`;
      const urlData = new URL(fullUrl);

      const queryData = {
        name: name,
        request: {
          method: method,
          header: [],
          url: {
            raw: fullUrl,
            protocol: urlData.protocol,
            host: urlData.host.split('.'),
            path: urlData.pathname,
          },
        },
        response: [],
      };

      localStorage.setItem(key, JSON.stringify(queryData));

      requestUrl = `/workspaces/${workspaceId}/collections/${collectionId}/${name}`;
    } catch (e) {
      console.error(e);
      alert('URL을 입력하세요');
    }

    if (requestUrl) {
      window.location.href = requestUrl;
    }
  };

  return (
    <div className="builder_container">
      <div className="builder_file_path">
        <div>
          <Link
            to={`/workspaces/${workspaceId}/collections/${collectionId}`}
            style={{ textDecoration: 'none', color: 'gray' }}
          >
            <span>{collectionData.collectionname}</span> /
          </Link>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
      </div>

      <div className="file_actions">
        <div className="box_btn_save">
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            size="big"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="builder_body">
        <div className="body_box_top">
          <div className="method_options_container">
            <div className="box_method_url">
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ minWidth: 125, height: '80%' }} size="small">
                  <Select
                    value={method}
                    onChange={handleChangeMethod}
                    displayEmpty
                  >
                    <MenuItem value="">
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
                  <FormControl
                    sx={{ marginRight: '200px', width: '127ch' }}
                    size="small"
                  >
                    <OutlinedInput
                      type="text"
                      value={fullUrl}
                      onChange={handleChangeUrl}
                      placeholder="Enter URL or paste text"
                    />
                  </FormControl>
                </Box>
              </Stack>
            </div>
            <div className="btn_send">
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                size="big"
                onClick={handleSendClick}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className="box_request_tab">
          <ApiRequestTabs />
        </div>
      </div>
    </div>
  );
}
