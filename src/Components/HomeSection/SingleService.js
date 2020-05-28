import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import css modules
import style from './assets/css/image.module.css';

// import HomeSections component
import ViewMore from './ViewMore';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        // height: 425,
        width: 300,
        margin: 25,
    },
    control: {
        padding: theme.spacing(2),
    },
    DivDecoration: {
        marginTop: 0,
        paddingTop: 25,
    },
    image: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block center',
        width: '75%',
        borderRadius: 20,
      },

}));


export default function SingleService({title, description, image}) {
    const classes = useStyles();


    return (
        <div>

            <Grid item>
                <Paper className={classes.paper} >

                    <div className={classes.DivDecoration}>
                        <img className={style.image} src={image} alt='' />
                        <h3 className={style.title} >{title}</h3>
                        <ViewMore
                            testid='viewMoreId'
                            title={'More details..'}
                            description={description} />
                    </div>
                </Paper>
            </Grid>


        </div>
    );
}

SingleService.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.node,
  };
