import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AccessContext from 'contexts/AccessContext';
import ConditionallyRender from 'component/common/ConditionallyRender';
import HeaderTitle from 'component/common/HeaderTitle';
import PageContent from 'component/common/PageContent';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import AdminMenu from 'component/admin/menu/AdminMenu';
import { useStyles } from './ProjectRoles.styles';
import ProjectRoleList from './ProjectRoleList/ProjectRoleList';

const ProjectRoles = () => {
    const { hasAccess } = useContext(AccessContext);
    const styles = useStyles();
    const history = useHistory();

    return (
        <div>
            <AdminMenu />
            <PageContent
                bodyClass={styles.rolesListBody}
                headerContent={
                    <HeaderTitle
                        title="Project Roles"
                        actions={
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            history.push(
                                                '/admin/create-project-role'
                                            )
                                        }
                                    >
                                        New Project role
                                    </Button>
                                }
                                elseShow={
                                    <small>
                                        PS! Only admins can add/remove roles.
                                    </small>
                                }
                            />
                        }
                    />
                }
            >
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<ProjectRoleList />}
                    elseShow={
                        <Alert severity="error">
                            You need instance admin to access this section.
                        </Alert>
                    }
                />
            </PageContent>
        </div>
    );
};

export default ProjectRoles;
