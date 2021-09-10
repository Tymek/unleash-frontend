import { Switch } from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './FeatureViewEnvironment.styles';

const FeatureViewEnvironment = ({ env }: any) => {
    const styles = useStyles();
    console.log(env.enabled);
    return (
        <div style={{ width: '100%' }}>
            <div className={styles.environmentContainer}>
                <Switch value={env.enabled} checked={env.enabled} /> Toggle in{' '}
                {env.name} is {env.enabled ? 'enabled' : 'disabled'}
            </div>
        </div>
    );
};

export default FeatureViewEnvironment;
