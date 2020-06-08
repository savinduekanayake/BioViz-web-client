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

// import components
import PairwaiseDetails from './Details/PairwiseDetails';
import MSADetails from './Details/MSADetails';
import DialogScreen from './DialogScreen';

// import react-redux
import {useDispatch, useSelector} from 'react-redux';
import {setDrawerOpen} from '../../Redux/Actions/Mode';

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


/**
 * Component to visualize one step path
 * @param {String} HeadTitle - Main titile of the VerticalLinearStepper
 * @param {String} title - title of each step(title1,title2,title3,title4)
 * @param {String} step - description of each step(step1,step2,step3,step4)
 * @param {node} image - the image in the VerticalLinearStepper
 * @return {React.ReactElement}
 */

// eslint-disable-next-line max-len
export default function VerticalLinearStepper({HeadTitle, image, title1, title2, title3, title4, step1, step2, step3, step4}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const drawerOpenStatus = useSelector((state) => state.drawerOpen);

    const dispatch = useDispatch();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onMove = () =>{
        dispatch(setDrawerOpen(!drawerOpenStatus));
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
                /* istanbul ignore next */
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>

            <h2>{HeadTitle}</h2>

            <Stepper activeStep={activeStep} orientation="vertical"
                testid='stepperId'>
                {steps.map((label, index) => (
                    <Step key={label} testid='stepId'>
                        <StepLabel testid='stepLabelId'>{label}</StepLabel>
                        <StepContent testid='stepContentId'>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <img
                                        className={style.img}
                                        src={image} alt=''
                                    />

                                    <Typography testid='typographyId'>
                                        {getStepContent(index)}
                                    </Typography>

                                    <Button testid='backButtonId'
                                        id = 'BackButtonId'
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button testid='nextButtonId'
                                        id = 'NextButtonId'
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
                <Paper square elevation={0} className={classes.resetContainer}
                    testid='paperId'>
                    <Typography component={'span'} testid='finishTypographyId'>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}
                        id = 'ResetButtonId'
                        testid='resetButtonId'>
                        Reset
                    </Button>
                    <br />
                    <Button testid='finalButtonId'
                        variant="outlined"
                        color="primary"
                        onClick={onMove}
                        >
                    {
                        `${HeadTitle}` === 'Pairwise' ?
                            'Go To Pairwise Alignment' :
                        `${HeadTitle}` === 'MSA' ?
                            'Go To MSA Alignment':
                            'Go To Game Alignment'
                    }
                    </Button>
                </Paper>

            )}

            <div className={classes.details}>

                {
                    `${HeadTitle}` === 'Pairwise' ?
                        <PairwaiseDetails testid = 'testPWDetails' /> :
                     `${HeadTitle}` === 'MSA' ?
                        <MSADetails testid = 'testPWDetails' /> :
                        <DialogScreen />
                }
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
