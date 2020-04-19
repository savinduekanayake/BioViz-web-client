import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// pages
import ParwiseSteps from './StepsInformation/PairwiseSteps';
import MSASteps from './StepsInformation/MSASteps';
import GameSteps from './StepsInformation/GameSteps';

// import css modules
import style from './assets/css/image.module.css';

// icons
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    'id': `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // width: '100%',
    // backgroundColor: theme.palette.background.paper,

    paddingLeft: '10%',
    paddingRight: '10%',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <h2 className={style.heading}>Steps</h2>
      <p className={style.subHeading}>
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label="Pairwise Alignment" {...a11yProps(0)} />
          <Tab label="MSA Alignment" {...a11yProps(1)} />
          <Tab label="Game Play"
            icon={<SportsEsportsIcon />} {...a11yProps(2)} />

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ParwiseSteps />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <MSASteps />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <GameSteps />
      </TabPanel>

    </div>
  );
}
