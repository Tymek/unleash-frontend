import { Button, ButtonProps, Tooltip } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import AccessContext from 'contexts/AccessContext';
import React, { useContext } from 'react';
import ConditionallyRender from '../ConditionallyRender';

export interface IPermissionButtonProps extends ButtonProps {
    permission: string | string[];
    onClick?: (e: any) => void;
    disabled?: boolean;
    projectId?: string;
    environmentId?: string;
}

const PermissionButton: React.FC<IPermissionButtonProps> = ({
    permission,
    variant = 'contained',
    color = 'primary',
    onClick,
    children,
    disabled,
    projectId,
    environmentId,
    ...rest
}) => {
    const { hasAccess } = useContext(AccessContext);
    let access;

    const handleAccess = () => {
        let access;
        if (Array.isArray(permission)) {
            access = permission.some(permission => {
                if (projectId && environmentId) {
                    return hasAccess(permission, projectId, environmentId);
                } else if (projectId) {
                    return hasAccess(permission, projectId);
                } else {
                    return hasAccess(permission);
                }
            });
        } else {
            if (projectId && environmentId) {
                access = hasAccess(permission, projectId, environmentId);
            } else if (projectId) {
                access = hasAccess(permission, projectId);
            } else {
                access = hasAccess(permission);
            }
        }

        return access;
    };

    access = handleAccess();

    const tooltipText = !access
        ? "You don't have access to perform this operation"
        : '';

    return (
        <Tooltip title={tooltipText} arrow>
            <span>
                <Button
                    onClick={onClick}
                    disabled={disabled || !access}
                    variant={variant}
                    color={color}
                    {...rest}
                    endIcon={
                        <ConditionallyRender
                            condition={!access}
                            show={<Lock />}
                        />
                    }
                >
                    {children}
                </Button>
            </span>
        </Tooltip>
    );
};

export default PermissionButton;
