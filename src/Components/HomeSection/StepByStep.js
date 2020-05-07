import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

// import css modules
import style from './assets/css/image.module.css';

import PairwaiseDetails from './Details/PairwiseDetails';
import MSADetails from './Details/MSADetails';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        marginTop: 80,
        marginLeft: '11%',
        marginBottom: 100,
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
        display: 'block center',
        width: '100%',
        borderRadius: 20,
      },
      details: {
          marginTop: 50,
      },
}),
);

// eslint-disable-next-line max-len
export default function VerticalLinearStepper({HeadTitle, image, title1, title2, title3, title4, step1, step2, step3, step4}) {
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

    function getSteps() {
        return [
            `${title1}`,
            `${title2}`,
            `${title3}`,
            `${title4}`,
        ];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return `${step1}`;
            case 1:
                return `${step2}`;
            case 2:
                return `${step3}`;
            case 3:
                return `${step4}`;
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>

            <h2>{HeadTitle}</h2>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <img
                                        className={style.img}
                                        src={image} alt=''
                                    />

                                    <Typography>
                                        {getStepContent(index)}
                                    </Typography>

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
                                        {activeStep === steps.length - 1 ?
                                         'Finish' : 'Next'}
                                    </Button>

                                </div>
                            </div>
                        </StepContent>
                    </Step>

                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography component={'span'}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                    >Go To Pairwise Alignment
                    </Button>
                </Paper>

            )}
            <div className={classes.details}>

                 {/* eslint-disable-next-line max-len */}
                {`${HeadTitle}` === 'Pairwise' ?<PairwaiseDetails testId = 'testPWDetails' /> : `${HeadTitle}` === 'MSA' ?<MSADetails testId = 'testPWDetails' /> : ''}
            </div>
        </div>
    );
}
VerticalLinearStepper.propTypes = {
    HeadTitle: PropTypes.string,
    image: PropTypes.node,
    title1: PropTypes.string,
    title2: PropTypes.string,
    title3: PropTypes.string,
    title4: PropTypes.string,
    step1: PropTypes.string,
    step2: PropTypes.string,
    step3: PropTypes.string,
    step4: PropTypes.string,
  };
