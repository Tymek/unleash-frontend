import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    firstContainer: {
        width: '47.5%',
        marginRight: '1rem',
    },
    [theme.breakpoints.down(1000)]: {
        firstContainer: { width: '100%', marginRight: '0' },
    },
}));
