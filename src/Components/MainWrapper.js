import React from 'react';
import MainDrawer from './Drawer/MainDrawer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

// Favicon attribution
// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

/**
 * Wrapper component for whole web page
 * @return {React.ReactElement}
 */
export const MainWrapper = () =>{
    let currentTheme = useSelector((state) => state.currentTheme);
    if (!(currentTheme === 'dark' || currentTheme === 'light')) {
        currentTheme = 'light';
    }
    const darkTheme = createMuiTheme({
        palette: {
          type: currentTheme,
        },
      });
    // changing the title
    document.title = 'BioViz Web Client';
    return (
        <div>
            <MuiThemeProvider theme={darkTheme}>
            <MainDrawer/>
            </MuiThemeProvider>
        </div>
    );
};
