import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Chip, ListItem, Tooltip } from '@material-ui/core';
import { Undo } from '@material-ui/icons';
import TimeAgo from 'react-timeago';
import StatusChip from 'component/common/StatusChip/StatusChip';
import ConditionallyRender from 'component/common/ConditionallyRender/ConditionallyRender';
import { UPDATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import { styles as commonStyles } from 'component/common';
import { useStyles } from './styles';
import { getTogglePath } from 'utils/routePathHelpers';
import FeatureStatus from 'component/feature/FeatureView/FeatureStatus/FeatureStatus';
import FeatureType from 'component/feature/FeatureView/FeatureType/FeatureType';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';

const FeatureToggleListItem = ({
    feature,
    revive,
    hasAccess,
    flags = {},
    ...rest
}) => {
    const styles = useStyles();

    const { projects } = useProjects();
    const isArchive = !!revive;

    const { name, description, type, stale, createdAt, project, lastSeenAt } =
        feature;

    const projectExists = () => {
        let projectExist = projects.find(proj => proj.id === project);
        if (projectExist) {
            return true;
        }
        return false;
    };

    const reviveFeature = () => {
        if (projectExists()) {
            revive(feature.name);
        }
    };
    return (
        <ListItem
            {...rest}
            className={classnames(styles.listItem, rest.className)}
        >
            <span className={styles.listItemMetric}>
                <FeatureStatus
                    lastSeenAt={lastSeenAt}
                    tooltipPlacement="left"
                />
            </span>
            <span
                className={classnames(
                    styles.listItemType,
                    commonStyles.hideLt600
                )}
            >
                <FeatureType type={type} />
            </span>
            <span className={classnames(styles.listItemLink)}>
                <ConditionallyRender
                    condition={!isArchive}
                    show={
                        <Link
                            to={getTogglePath(feature.project, name)}
                            className={classnames(
                                commonStyles.listLink,
                                commonStyles.truncate
                            )}
                        >
                            <Tooltip title={description}>
                                <span className={commonStyles.toggleName}>
                                    {name}&nbsp;
                                </span>
                            </Tooltip>
                            <span className={styles.listItemToggle}></span>
                            <small>
                                <TimeAgo date={createdAt} live={false} />
                            </small>
                            <div>
                                <span className={commonStyles.truncate}>
                                    <small>{description}</small>
                                </span>
                            </div>
                        </Link>
                    }
                    elseShow={
                        <>
                            <Tooltip title={description}>
                                <span className={commonStyles.toggleName}>
                                    {name}&nbsp;{' '}
                                </span>
                            </Tooltip>
                            <span className={styles.listItemToggle}></span>
                            <small>
                                <TimeAgo date={createdAt} live={false} />
                            </small>
                            <div>
                                <span className={commonStyles.truncate}>
                                    <small>{description}</small>
                                </span>
                            </div>
                        </>
                    }
                />
            </span>
            <span
                className={classnames(
                    styles.listItemStrategies,
                    commonStyles.hideLt920
                )}
            >
                <StatusChip stale={stale} showActive={false} />
                <Link
                    to={`/projects/${project}`}
                    style={{ textDecoration: 'none' }}
                    className={classnames({
                        [`${styles.disabledLink}`]: !projectExists(),
                    })}
                >
                    <Chip
                        color="primary"
                        variant="outlined"
                        className={styles.typeChip}
                        style={{ marginLeft: '8px', cursor: 'pointer' }}
                        title={`Project: ${project}`}
                        label={project}
                    />
                </Link>
            </span>
            <ConditionallyRender
                condition={revive}
                show={
                    <PermissionIconButton
                        permission={UPDATE_FEATURE}
                        projectId={project}
                        disabled={
                            !hasAccess(UPDATE_FEATURE, project) ||
                            !projectExists()
                        }
                        onClick={reviveFeature}
                    >
                        <Undo />
                    </PermissionIconButton>
                }
            />
        </ListItem>
    );
};

FeatureToggleListItem.propTypes = {
    feature: PropTypes.object,
    revive: PropTypes.func,
    hasAccess: PropTypes.func.isRequired,
    flags: PropTypes.object,
};

export default memo(FeatureToggleListItem);
