import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ParamsTab from './Params/ParamsTab';
import HeadersTab from './Headers/HeadersTab';
import BodyTab from './Body/BodyTab';
import ResultTab from './Result/ResultTab';

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

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // const transitionDuration = {
  //   enter: theme.transitions.duration.enteringScreen,
  //   exit: theme.transitions.duration.leavingScreen,
  // };

  return (
    <Box
      sx={{
        bgcolor: 'transparent',
        width: 1224,
        position: 'relative',
        minHeight: 283,
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        sx={{
          height: '35px',
          background: 'rgba(0, 0, 0, 0)',
          boxShadow: 'none',
          top: '50px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          aria-label="action tabs example"
        >
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
          <Tab label="Body" {...a11yProps(2)} />
          <Tab label="Result" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ParamsTab />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <HeadersTab />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <BodyTab />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ResultTab />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
