import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


// import css modules
import style from './assets/css/image.module.css';

// import images
import image1 from './assets/img/1.jpg';
import image2 from './assets/img/2.jpg';
import image3 from './assets/img/3.png';

// import pages
import SingleService from './SingleService';

const services = [
     {
        title: 'Analyze DNA Sequence',
     description: 'Lorem ipsum dolor sit amet consectetur.',
     image: image1,
    },

    {
    title: 'Visualize DNA Alignment',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    image: image2,
    },

    {
    title: 'Simple GamePlay',
    description: 'Lorem ipsum dolor sit amet consectetur',
    image: image3,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 20,
    },

}));


export default function Services() {
    const classes = useStyles();

    return (
        <div className={style.servicesBackground}>

            <h2 className={style.heading}>Services</h2>
            <p className={style.subHeading}>
                Lorem ipsum dolor sit amet consectetur.
            </p>

            <Grid container className={classes.root} >
                <Grid item xs={12}>
                    <Grid container justify="center" >

                        {services.map((service, index) => {
                            return <SingleService {...service} key={index} />;
                        })}

                    </Grid>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aut eaque, laboriosam veritatis, quos
                         non quis ad perspiciatis,
                        totam corporis ea, alias ut unde.</p>
                </Grid>

            </Grid>
        </div>
    );
}
