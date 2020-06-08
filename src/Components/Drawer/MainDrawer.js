import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';


import {DrawerList} from './DrawerList';
import MainContent from '../MainContent';
import {setDrawerOpen} from '../../Redux/Actions/Mode';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        // [theme.breakpoints.up('xl')]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        // },
    },
    appBar: {
        // [theme.breakpoints.up('xl')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },

    },
    menuButton: {
        marginRight: theme.spacing(2),
        // [theme.breakpoints.up('xl')]: {
        //     display: 'none',
        // },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    headerBox: {
        width: '100%',
    },

}));

function MainDrawer(props) {
    const {container} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const drawerOpenStatus = useSelector((state) => state.drawerOpen);
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        // setMobileOpen(!mobileOpen);
        dispatch(setDrawerOpen(!drawerOpenStatus));
    };


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box className={classes.headerBox}>
                        <Typography variant="h6" noWrap>
                            BioViz Web Client
              </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">

                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={drawerOpenStatus}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                            // Better open performance on mobile.
                        }}
                    >
                        <DrawerList closeDrawer={handleDrawerToggle}/>
                    </Drawer>

            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />


                <Box >
                    <MainContent />

                </Box>

            </main>
        </div>
    );
}

MainDrawer.propTypes = {
    container: PropTypes.object,
};

export default MainDrawer;
