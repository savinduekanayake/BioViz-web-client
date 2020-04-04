import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//import css modules
import style from './assets/css/image.module.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        height: 425,
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
        display: 'block',
        width: '75%',
        display: 'center',
        borderRadius: 20
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
