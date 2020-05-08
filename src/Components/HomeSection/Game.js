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

import Snackbar from './Snackbar';

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

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

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

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

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
        avatar={
          <Checkbox
            testid='checkBoxId'
            onClick={handleToggleAll(items)}
            checked=
            {numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate=
            {numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{'aria-label': 'all items selected'}}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list" testid='listId'>
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
              <ListItemIcon >
                <Checkbox
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


  const checkResult = () => {
    if (left === pairwise && right === msa) {
        return (
            <Snackbar />
        );
    }
  };

  return (
    <Grid container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
    >
      <Grid item>{customList('Pairwise Alignment', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            onClick = {checkResult}
            >Submit</Button>
          <Button
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
      <Grid item>{customList('MSA Alignment', right)}</Grid>

    </Grid>
  );
}
