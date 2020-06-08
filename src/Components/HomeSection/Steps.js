import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// import component
import StepByStep from './StepByStep';

// import css modules
import style from './assets/css/image.module.css';

// icons
import Icon from '@material-ui/core/Icon';
import DnaIcon from '../../assets/icons/dna.svg';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';

// images
import msaImage from './assets/img/Steps/MSA.png';
import pwImage from './assets/img/Steps/pw.png';
import gameImage from './assets/img/Steps/game.jpg';


const pairwiseData = {
  HeadTitle: 'Pairwise',
  image: pwImage,
  title1: `Select the BioInformatic Pairwise Alignment`,
  title2: `Enter your DNA sequences`,
  title3: `Select and enter your variables`,
  title4: `Get final results`,
  step1: `First click the menu icon. 
          Then you can see some menu items in leftside.
          After that click 'PairAlign' to visit Pairwise Alignment.`,
  step2: `This alignment needs two sequences.
          There are many options to enter the sequences.
          You can type your two DNA sequences, Upload text file with 
          'FASTA' format or Query from database by using 'Ensembl-id'.`,
  step3: `First you need to select a alignment type. Then either you can choose
          scoring method 'Basic' or 'Extended' According to that
          you need to enter variables.
          'Extended' is more advanced and user customizable option to user. 
          If you willing to change the values 
          you can enter new values and try the result.`,
  step4: `If you are finished the all above steps just click 
        'Enter' to get the result. This may can get few 
          secounds to visualize the result with final alignment with matrix.`,
};

const MSAData = {
  HeadTitle: 'MSA',
  image: msaImage,
  title1: `Select the BioInformatic MSA Alignment`,
  title2: `Enter your DNA sequences`,
  title3: `Select and enter your variables`,
  title4: `Get final results`,
  step1: `First click the menu icon. Then you can see some menu
        items in leftside. After that click 'MSA' to visit
        Multiple Sequence Alignment.`,
  step2: `This alignment can give input upto six sequences.
        There are many options to enter the sequences.
        You can type your two DNA sequences, Upload text file with 
        'FASTA' format or Query from database by using 'Ensembl-id'.`,
   step3: `First you need to select 'Genome Type'. Then either you can choose 
        'Algorithm Type' Progressive Algorithm or User Defined algorithm.
        'Progressive Algorithm' is the most standard way and 
        'User Defined algorithm' is more custamizable option to user.
        If you willing to change the values you can 
        enter new values and try the result.`,
  step4: `If you are finished the all above steps just click 
      'Enter' to get the result. This may can get few 
      secounds/minutes to visualize the result.`,
};

const gameData = {
  HeadTitle: 'Gameplay',
  image: gameImage,
  title1: `Select the Gameplay`,
  title2: `Read the instruction`,
  title3: `Enter your answer`,
  title4: `Click enter to get score`,
  step1: `First click the menu icon. 
        Then you can see some menu items in leftside. After that click 
        'Alignment Game' to play Alignment Game.`,
  step2: `Read the instruction...`,
  step3: `There are defaultly set values of 
         'mismatch' and 'gap'. You need to enter your answers.`,
  step4: `If you are finished the all above steps just 
        click 'Enter' to get the result. This may can get 
        few secounds to visualize the score.`,
};


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography component={'span'} testid='typography2Id'
      // component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box testid='boxId' p={3}>{children}</Box>}
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

/**
 *Component to visualize steps of the website to get alignments
 * @return {React.ReactElement}
 */

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
        This will help you how to enter sequences and
        step by stept to get the final results.
      </p>

      <AppBar position="static" color="default" testid='appBarId'>
        <Tabs testid='tabsId'
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab testid='tabsId1' label="Pairwise Alignment"
            icon={
            <Icon key='1'><img src={DnaIcon} alt="PairAlign Icon" /></Icon>
            } {...a11yProps(0)} />

          <Tab testid='tabsId2' label="MSA Alignment"
            icon={
              <span>
                <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon>
                <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon>
              </span>
            } {...a11yProps(1)} />

          <Tab testid='tabsId3' label="Game Play"
            icon={<SportsEsportsRoundedIcon />} {...a11yProps(2)} />

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} testid='tabPanelId1'>
        <StepByStep {...pairwiseData} testid='tabPstepByStepId1'/>
      </TabPanel>

      <TabPanel value={value} index={1} testid='tabPanelId2'>
      <StepByStep {...MSAData} testid='tabPstepByStepId2' />
      </TabPanel>

      <TabPanel value={value} index={2} testid='tabPanelId3'>
      <StepByStep {...gameData} testid='tabPstepByStepId3' />
      </TabPanel>

    </div>
  );
}
