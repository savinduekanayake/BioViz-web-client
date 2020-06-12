import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import image from './assets/img/KnowledgeGame/knoldge.jpg';
import DialogScreen from './DialogScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    marginBottom: '2px',

  },
  position: {
    paddingTop: '20px',
    paddingLeft: '30%',
    // paddingRight: '20%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (

      <div className={classes.position}>

        <Card className={classes.root}>
            <CardHeader
                title="Grab the knoladge about basics from scratch"
                subheader="Score your knowledge"
            />
            <CardMedia
                className={classes.media}
                image={image}
                title="Paella dish"
            />
            <DialogScreen />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This is a simple game which only look out your basic and
                    fundermental knowledge about the
                    two aignment of Pairwise and MSA.
                    You just need to re-order the items according to the relavant section.

                </Typography>
            </CardContent>

        </Card>
    </div>

  );
}
