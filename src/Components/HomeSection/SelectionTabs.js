import React from 'react';

//Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//pages
import ParwiseSteps from './PairwiseSteps';
import MSASteps from './MSASteps';
import GameSteps from './GameSteps';

//import css modules
import style from './assets/css/image.module.css';

//icons
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft:'10%',
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <h2 className={style.heading}>Steps</h2>
        <p className={style.subHeading}>Lorem ipsum dolor sit amet consectetur.</p>

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
          <Tab label="Pairwise Alignment"  {...a11yProps(0)} />
          <Tab label="MSA Alignment" {...a11yProps(1)} />
          <Tab label="Game Play" icon={<SportsEsportsIcon />} {...a11yProps(2)} />
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
