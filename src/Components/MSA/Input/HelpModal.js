import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
    sampleSequences,
    samplePairings,
    sampleGraph,
} from '../../../util/msaHelpData';
import PairingOrderList from './PairingOrderList';
import MSATree from '../MSATree';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    seqListItem: {
        backgroundColor: '#00000010',
        marginBottom: 3,
    },
}));

/**
 * Component to display helper dialog box for MSA pairing order
 * @return {React.ReactElement}
 */
export default function HelpModal() {
    const classes = useStyles();

    /**
     * open state of the dialog box
     */
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const seqList = sampleSequences.map((seq, index) => {
        return (
            <ListItem key={index} className={classes.seqListItem}>
                {index + 1} - {seq}
            </ListItem>
        );
    });

    const bottomInfo = <>
        Above pairing order will give the following tree.
        <br />
        Indices 7, 8, 9, 10 correspond to intermediate profiles.
        <br />
        11 denotes the final alignment
    </>;

    return (
        <div>
            <Link
                component="button"
                variant="body2"
                onClick={handleOpen}>
                Need help for this?
            </Link>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                Sequences with their indices
                                <List>
                                    {seqList}
                                </List>
                            </Grid>
                            <Grid item xs={8}>
                                Sample pairing
                                <br/>
                                <PairingOrderList
                                    pairingOrder={samplePairings} />
                                <br />
                                {bottomInfo}
                            </Grid>
                        </Grid>


                        <MSATree
                            treeData={sampleGraph}
                            type='sample'
                            setSelected={() => { }} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
