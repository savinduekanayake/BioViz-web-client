// import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField';
// import {List, ListItem, makeStyles,
//     ListItemText, Grid, Typography} from '@material-ui/core';


// const useStyles = makeStyles((theme) => ({
//     suggestions: {
//         width: 300,
//         maxHeight: 100,
//         overflowY: 'auto',
//     },
//     suggestionItem: {
//         height: 22,
//     },
//     inputBox: {
//         width: 300,
//     },
// }));

// export default function AutoComplete(props) {
//     const classes = useStyles();
//     const [activeSuggestion, setactiveSuggestion] = useState(-1);
//     const [filtered, setfiltered] = useState([]);
//     const [showSuggestions, setshowSuggestions] = useState(false);
//     const [userInput, setuserInput] = useState('');

//     const onChange = (e) => {
//         const userInput = e.currentTarget.value;

//         // Filter our suggestions that don't contain the user's input
//         const filteredSuggestions = props.genomeNames.filter(
//             (suggestion) =>
//                 suggestion.toLowerCase().indexOf(
//                     userInput.toLowerCase()) > -1,
//         );
//         setactiveSuggestion(-1);
//         setfiltered(filteredSuggestions);
//         setshowSuggestions(true);
//         setuserInput(e.currentTarget.value);
//     };

//     const onClick = (e) => {
//         const suggestionText = e.currentTarget.innerText;
//         const suggestionId = props.genomeNames.indexOf(suggestionText);
//         setactiveSuggestion(suggestionId);
//         setfiltered([]);
//         setshowSuggestions(false);
//         setuserInput(suggestionText);
//         console.log(activeSuggestion);
//     };
//     let suggestionsListComponent;


//     if (showSuggestions && userInput) {
//         if (filtered.length > 0) {
//             suggestionsListComponent = (
//                 <List className={classes.suggestions}>
//                     {filtered.map((suggestion, index) => {
//                         return (
//                             <ListItem
//                             button
//                             key={suggestion}
//                             className={classes.suggestionItem}
//                             onClick={onClick}>
//                                 <ListItemText primary={suggestion} />
//                             </ListItem>
//                         );
//                     })}
//                 </List>
//             );
//         } else {
//             suggestionsListComponent = (
//                 <div >
//                     <Typography>
//                         Could not find a matching genome
//                     </Typography>
//                 </div>
//             );
//         }
//     }

//     return (
//         <div>
//             <Grid
//                 container
//                 direction='column'
//                 align="center"
//                 justify="center"
//                 alignItems="center">
//                 <Grid item>
//                     <TextField
//                         className={classes.inputBox}
//                         label="Sear" type="text"
//                         onChange={onChange}
//                         value={userInput} />
//                 </Grid>
//                 <Grid item>
//                     {suggestionsListComponent}

//                 </Grid>
//             </Grid>


//         </div>
//     );
// }

// AutoComplete.propTypes = {
//     genomeNames: PropTypes.arrayOf(PropTypes.string),
// };
