import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';

import DnaIcon from '../../assets/icons/dna.svg';

import {useDispatch} from 'react-redux';
import {setMode} from '../../Redux/Actions/Mode';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

export function DrawerList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const navItems =
        [['Home', <HomeIcon key='0' />],
            ['PairAlign', <Icon key='1'><img src={DnaIcon}
            alt="PairAlign Icon" /></Icon>],
        ['MSA', <span key='2'> <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon>
            <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon></span>],
        ['Alignment Game', <SportsEsportsIcon key='3' />]];

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem button key={item[0]} onClick={() => {
                        dispatch(setMode(index));
                    }}>
                        <ListItemIcon>{item[1]}</ListItemIcon>
                        <ListItemText primary={item[0]} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
