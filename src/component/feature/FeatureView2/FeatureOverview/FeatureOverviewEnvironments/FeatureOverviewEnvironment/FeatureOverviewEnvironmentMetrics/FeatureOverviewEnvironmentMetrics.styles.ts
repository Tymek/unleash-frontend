import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    info: {
        marginRight: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        fill: theme.palette.grey[300],
        height: '75px',
        width: '75px',
    },
    infoParagraph: {
        maxWidth: '150px',
        marginTop: '0.25rem',
        fontSize: theme.fontSizes.smallBody,
    },
    percentage: {
        color: theme.palette.primary.light,
        textAlign: 'center',
        fontSize: theme.fontSizes.subHeader,
    },
}));
