import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    listItem: {
        padding: '0',
        margin: '1rem 0',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    listItemMetric: {
        width: '40px',
        marginRight: '0.25rem',
        flexShrink: 0,
    },
    listItemType: {
        width: '40px',
        textAlign: 'center',
        marginRight: '0',
        flexShrink: 0,
    },
    listItemSvg: {
        // @ts-expect-error
        fill: theme.palette.icons.lightGrey,
    },
    listItemLink: {
        marginLeft: '0.25rem',
        minWidth: '0',
    },
    listItemStrategies: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    disabledLink: {
        pointerEvents: 'none',
    },
}));
