import React from 'react';
import Services from './Services';

//import css modules
import style from './assets/css/image.module.css';

//
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import image1 from './assets/img/1.jpg';


const useStyles = makeStyles((theme) => ({
    paper: {
        height: 450,
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

}));


export default function SingleService({ title, description, image }) {
    const classes = useStyles();
    return (
        <div>

            <Grid item>
                <Paper className={classes.paper} >

                    <div className={classes.DivDecoration}>
                        <img className={style.image} src={image} alt='' />
                        <h3 className={style.title}>{title}</h3>
                        <p className={style.subTitle}>{description}</p>
                    </div>
                </Paper>
            </Grid>


        </div>
    );
}
