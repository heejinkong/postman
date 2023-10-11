
import React, { useState } from 'react';
import '../style/responsesuccess.scss'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ResponseBodyTab from './ResponseSuccessTabs/ResponseBodyTab';
import ResponseHeadersTab from './ResponseSuccessTabs/ResponseHeadersTab';
import ResultDiff from './ResponseSuccessTabs/ResponseDiffTab';
import { useData } from '../contexts/DataContext';
import Response from './Response';




function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

export default function ResponseSuccess() {
    const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const {resultText, resultData} = useData();

  return (
    <div className='responsesuccess_container'>
      { resultData !== '' ? (
        <Box
        sx={{
          bgcolor: 'transparent',
          width: 1550,
          position: 'relative',
          minHeight: 283,
        }}
      >
        <AppBar position="static" color= "transparent"
        sx={{
          height: '35px', 
          background: 'rgba(0, 0, 0, 0)',
          boxShadow: 'none',
          top: '50px'
         
        }} >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
            aria-label="action tabs example"
          >
            <Tab label="Body" {...a11yProps(0)} />
            <Tab label="Headers" {...a11yProps(1)} />
            {/* <Tab label="Rsult diff" {...a11yProps(2)} /> */}
            {resultText !== '' ? (
            <Tab label="Rsult diff" {...a11yProps(2)} />) :('')
          }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
              <ResponseBodyTab/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ResponseHeadersTab/>
          </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
            <ResultDiff/>
          </TabPanel>
        </SwipeableViews>
        
      </Box>

      ) : (
        <Response />
      )}
    </div>
  );
}
