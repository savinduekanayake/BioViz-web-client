import React from 'react';
import PropTypes from 'prop-types';
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

import {useDispatch, useSelector} from 'react-redux';
import {setMode} from '../../Redux/Actions/Mode';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    navItem: {
        paddingTop: 0,
        paddingBottom: 0,
        margin: 'auto',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 30,
        width: 270,
    },
    navItemSelected: {

        borderStyle: 'solid',
        backgroundColor: '#00000020',

    },
}));

/**
 * Component to display navigation manus in drawer.
 * @param {Object} props
 * @return {React.ReactElement}
 */
export function DrawerList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentMode = useSelector((state) => state.mode);


    // array with menu name, description and icon
    const navItems =
        [['Home',
            'Homepage with instructions',
            <HomeIcon key='0' />],
        ['PairAlign',
            'Align a pair of sequences',
            <Icon key='1'><img src={DnaIcon} alt="PairAlign Icon" /></Icon>],
        ['MSA',
            'Align multiple sequences',
            <span key='2'> <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon>
                <Icon><img src={DnaIcon} alt="MSA Icon" /></Icon></span>],
        ['Alignment Game',
            'Test your skill on detecting alignments',
            <SportsEsportsIcon key='3' />]];

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem
                        // currently selected nav manu has a different styling
                        className={`${classes.navItem} ${index === currentMode ?
                            classes.navItemSelected : null}`}
                        button key={item[0]} onClick={() => {
                            dispatch(setMode(index));
                            props.closeDrawer();
                        }}>
                        <ListItemIcon>{item[2]}</ListItemIcon>
                        <ListItemText
                        primary={item[0]}
                        primaryTypographyProps={{variant: 'h6'}}
                        secondary={item[1]} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

DrawerList.propTypes = {
    closeDrawer: PropTypes.func,
};
