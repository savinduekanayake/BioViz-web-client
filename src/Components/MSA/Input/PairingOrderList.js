import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    availableIconsGrid: {
        margin: 5,
    },
    submitButton: {
        color: 'green',
    },
    avatar: {
        color: 'white',
        backgroundColor: 'red',
        width: 25,
        height: 25,
        fontSize: 15,
    },
}));

/**
 * Component to display current pairing order
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function PairingOrderList(props) {
    const classes = useStyles();
    function makeAvatar(character) {
        return (
            <Avatar className={classes.avatar}>{character}</Avatar>
        );
    }

    const orderList = props.pairingOrder.map((element) => {
        return (
            <div key={element[2]}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {makeAvatar(element[0])}
                            </td>
                            <td>
                                <AddIcon />
                            </td>
                            <td>
                                {makeAvatar(element[1])}
                            </td>
                            <td>
                                <ArrowForwardIcon />
                            </td>
                            <td>
                                {makeAvatar(element[2])}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    });
    return (
        <div>
            {orderList}
        </div>
    );
}

PairingOrderList.propTypes = {
    pairingOrder: PropTypes.arrayOf(PropTypes.number),
};
