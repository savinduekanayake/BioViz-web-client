import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// import HomeSections component
import Snackbar from './Snackbar';
import Alert from './Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 400,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// function union(a, b) {
//   return [...a, ...not(b, a)];
// }

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  // const [answer, setAnswer] = React.useState(false);
  const [Alertcomponent, setAlertcomponent] = React.useState(null);

  // update the sentences
  const [left, setLeft] = React.useState(
      ['Good for same length',
      'Can compaire two sequences',
      'Can compare more than 2 sequeneces',
    ]);

  const [right, setRight] = React.useState(
      ['Time proportianal to O(n^2)',
      'Easy to calculate',
      'Time proposinal based on no of input sequences',
    ]);

    const pairwise =
        ['Good for same length',
        'Can compaire two sequences',
        'Time proportianal to O(n^2)',
        'Easy to calculate',
        ];

    const msa =
        ['Can compare more than 2 sequeneces',
        'Time proposinal based on no of input sequences',
        ];


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  // const handleToggleAll = (items) => () => {
  //   if (numberOfChecked(items) === items.length) {
  //     setChecked(not(checked, items));
  //   } else {
  //     setChecked(union(checked, items));
  //   }
  // };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card testid='cardId'>
      <CardHeader testid='cardHeaderId'
        className={classes.cardHeader}
        // avatar={
        //   <Checkbox
        //     testid='checkBoxId'
        //     onClick={handleToggleAll(items)}
        //     checked=
        //     {numberOfChecked(items) === items.length && items.length !== 0}
        //     indeterminate=
        //     {numberOfChecked(items) !== items.length &&
        //         numberOfChecked(items) !== 0}
        //     disabled={items.length === 0}
        //     inputProps={{'aria-label': 'all items selected'}}
        //   />
        // }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider testid='dividerId' />
      <List className={classes.list} dense component="div" role="list"
        testid='listId'>
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
                testid='listItemId'
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
            >
              <ListItemIcon testid='listItemIconId'>
                <Checkbox testid='checkBox2Id'
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const instruction = {
    message: 'Select and move the rows into relavant alignment.',
  };

  const rightAnswerAlert = {
    viewResult: true,
    title: 'Congrats!',
    description: 'Your anser is right.',
  };

  const wrongAnswerAlert = {
    viewResult: true,
    title: 'Try again!',
    description: 'Your anser is wrong.',
  };

  const checkResult = () => {
     // snack bar is not working! . doesn't know why. but alert is working----
    if (left.length === pairwise.length && right.length === msa.length) {
        return (
          setAlertcomponent(
          <Alert onClick = {checkResult} {...rightAnswerAlert} />,
          )
        );
    } else {
      return (
        setAlertcomponent(
        <Alert onClick = {checkResult} {...wrongAnswerAlert} />,
        )
      );
    }
  };

  return (
    <div className={classes.root}>
      <Grid container testid='gridId'
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.root}
      >
        <Grid item testid='gridItemId1'>
          {customList('Pairwise Alignment', left)}</Grid>
        <Grid item testid='gridItemId2'>
          <Grid container direction="column" alignItems="center"
            testid='gridContainerId'>
            <Button testid='buttonId1'
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>

            <Button testid='buttonId2'
              onClick = {checkResult}
              >{
                Alertcomponent?
                  'Re-submit':
                    'Submit'}
                </Button>

              {Alertcomponent}

            <Button testid='buttonId3'
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Snackbar {...instruction} testid='snackbarId' />
        <Grid item testid='gridItemId3'>
          {customList('MSA Alignment', right)}</Grid>

      </Grid>
    </div>
  );
}
