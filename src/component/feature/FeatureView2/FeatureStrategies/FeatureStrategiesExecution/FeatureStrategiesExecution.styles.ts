import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
        margin: '1rem 0',
        maxWidth: '270px',
        padding: '1rem',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        margin: '0.5rem 0',
        fontSize: theme.fontSizes.bodySize,
    },
    text: { textAlign: 'center', margin: '0.2rem 0 0.5rem' },
}));
