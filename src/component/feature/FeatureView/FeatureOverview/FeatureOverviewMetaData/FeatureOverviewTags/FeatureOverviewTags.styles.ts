import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '10px',
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1rem',
        marginTop: '1rem',
    },
    [theme.breakpoints.down(800)]: {
        container: {
            width: '100%',
            maxWidth: 'none',
        },
    },
    tagHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    tag: {
        height: '40px',
        width: '40px',
        fill: theme.palette.primary.main,
        marginRight: '0.8rem',
    },
    tagChip: {
        marginRight: '0.25rem',
        marginTop: '0.5rem',
        backgroundColor: '#fff',
        fontSize: theme.fontSizes.smallBody,
    },
    closeIcon: {
        color: theme.palette.primary.light,
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
}));
