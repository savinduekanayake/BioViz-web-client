import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


//import css modules
import style from '../assets/css/image.module.css';

//should add images according to MSA steps
import image1 from '../assets/img/Steps/MSA.png'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        marginTop: 80,
        marginLeft: 130,
        marginBottom: 150,
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    image: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        display: 'center',
        borderRadius: 20
      },
}),
);

function getSteps() {
    return [ 'Select a BioInformatic MSA Alignment', 'Enter your DNA sequences', 'Enter your variables', 'Click enter to results'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `First click the menu icon. Then you can see some menu items in leftside. 
            After that click 'MSA' to visit Multiple Sequence Alignment.`;
        case 1:
            return `There are two inputs in default.You can add new input according to your requirments. 
            You need to enter your DNA sequences. 
            You can either upload ".txt" file or type the sequence.`;
        case 2:
            return `There are default values for 'match' 'mismatch' and 'gap'. 
            If you willing to change the values you can enter new values for relavent variables.`;
        case 3:
            return `If you are finished the all above steps just click 'Enter' to get the result.
            This may can get few secounds to visualize the result.`;
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>

            <h1>MSA</h1>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            
                            <div className={classes.actionsContainer}>
                                <div>
                                    <img className={style.img} src={image1} alt='' />
                                    <Typography>{getStepContent(index)}</Typography>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                   
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
          <Button variant="outlined" color="secondary">Go To MSA Alignment</Button>
                </Paper>
                
            )}
        </div>
    );
}
