import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    radioGroup: {
        flexDirection: 'row',
    },
    formHeader: {
        fontWeight: 'bold',
        fontSize: theme.fontSizes.bodySize,
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
    },
    radioBtnGroup: { display: 'flex', flexDirection: 'column' },
}));
