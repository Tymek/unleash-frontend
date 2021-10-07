import React from 'react';
import { Cloud } from '@material-ui/icons';
import { useParams, Link } from 'react-router-dom';
import { Switch, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import ConditionallyRender from '../../../common/ConditionallyRender';
import useFeatureApi from '../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useToast from '../../../../hooks/useToast';
import { FC } from 'react';
import { IFeatureEnvironment } from '../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../interfaces/params';

import { useStyles } from './FeatureViewEnvironment.styles';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';

interface IFeatureViewEnvironmentProps {
    env: IFeatureEnvironment;
    className?: string;
}

const FeatureViewEnvironment: FC<IFeatureViewEnvironmentProps> = ({
    env,
    children,
    className,
}: IFeatureViewEnvironmentProps) => {
    const { featureId, projectId } = useParams<IFeatureViewParams>();
    const { toggleFeatureEnvironmentOn, toggleFeatureEnvironmentOff } =
        useFeatureApi();
    const styles = useStyles();
    const { refetch } = useFeature(projectId, featureId);
    const { toast, setToastData } = useToast();

    if (!env) return null;

    const handleToggleEnvironmentOn = async () => {
        try {
            await toggleFeatureEnvironmentOn(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully turned environment on.',
            });
            refetch();
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const handleToggleEnvironmentOff = async () => {
        try {
            await toggleFeatureEnvironmentOff(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully turned environment off.',
            });
            refetch();
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const toggleEnvironment = (e: React.ChangeEvent) => {
        if (env.enabled) {
            handleToggleEnvironmentOff();
            return;
        }
        handleToggleEnvironmentOn();
    };

    const iconContainerClasses = classNames(styles.iconContainer, {
        [styles.disabledIconContainer]: !env?.enabled,
    });

    const iconClasses = classNames(styles.icon, {
        [styles.iconDisabled]: !env?.enabled,
    });

    const environmentIdentifierClasses = classNames(
        styles.environmentIdentifier,
        { [styles.disabledEnvContainer]: !env?.enabled }
    );

    const containerClasses = classNames(styles.container, className);

    return (
        <div className={containerClasses}>
            <div className={environmentIdentifierClasses}>
                <div className={iconContainerClasses}>
                    <Cloud className={iconClasses} />
                </div>
                <p className={styles.environmentBadgeParagraph}>{env.type}</p>
            </div>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <Tooltip title={env.name}>
                        <p className={styles.environmentTitle}>{env.name}</p>
                    </Tooltip>
                </div>
                <div className={styles.environmentStatus}>
                    <ConditionallyRender
                        condition={env?.strategies?.length > 0}
                        show={
                            <div className={styles.textContainer}>
                                <Switch
                                    value={env.enabled}
                                    checked={env.enabled}
                                    onChange={toggleEnvironment}
                                />{' '}
                                <span className={styles.toggleText}>
                                    The feature toggle is{' '}
                                    {env.enabled ? 'enabled' : 'disabled'} in{' '}
                                    {env.name}
                                </span>
                            </div>
                        }
                        elseShow={
                            <>
                                <p className={styles.toggleText}>
                                    No strategies configured for environment.
                                </p>
                                <Link
                                    to={`/projects/${projectId}/features2/${featureId}/strategies?addStrategy=true&environment=${env.name}`}
                                    className={styles.toggleLink}
                                >
                                    Configure strategies for {env.name}
                                </Link>
                            </>
                        }
                    />
                </div>
            </div>
            <ConditionallyRender
                condition={env.strategies.length > 0}
                show={<div className={styles.body}>{children}</div>}
            />
            {toast}
        </div>
    );
};

export default FeatureViewEnvironment;
