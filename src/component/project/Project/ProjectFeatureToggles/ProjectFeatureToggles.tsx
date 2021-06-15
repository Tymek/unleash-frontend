import { Button, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import HeaderTitle from '../../../common/HeaderTitle';
import PageContent from '../../../common/PageContent';
import FeatureToggleListNew from '../../../feature/FeatureToggleListNew/FeatureToggleListNew';
import { useStyles } from './ProjectFeatureToggles.styles';

const ProjectFeatureToggles = () => {
    const styles = useStyles();
    return (
        <PageContent
            className={styles.container}
            headerContent={
                <HeaderTitle
                    className={styles.title}
                    title="Feature toggles"
                    actions={
                        <>
                            <IconButton className={styles.iconButton}>
                                <FilterListIcon className={styles.icon} />
                            </IconButton>
                            <Button variant="contained" color="primary">
                                New feature toggle
                            </Button>
                        </>
                    }
                />
            }
        >
            <FeatureToggleListNew />
        </PageContent>
    );
};

export default ProjectFeatureToggles;
