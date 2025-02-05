import { Switch, Tooltip, SwitchProps } from '@material-ui/core';
import AccessContext from 'contexts/AccessContext';
import React, { useContext } from 'react';

interface IPermissionSwitchProps extends SwitchProps {
    permission: string;
    tooltip?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    projectId?: string;
    environmentId?: string;
    checked: boolean;
}

const PermissionSwitch = React.forwardRef<
    HTMLButtonElement,
    IPermissionSwitchProps
>((props, ref) => {
    const {
        permission,
        tooltip,
        disabled,
        projectId,
        environmentId,
        checked,
        onChange,
        ...rest
    } = props;

    const { hasAccess } = useContext(AccessContext);

    let access;
    if (projectId && environmentId) {
        access = hasAccess(permission, projectId, environmentId);
    } else if (projectId) {
        access = hasAccess(permission, projectId);
    } else {
        access = hasAccess(permission);
    }

    const tooltipText = !access
        ? "You don't have access to perform this operation"
        : '';

    return (
        <Tooltip title={tooltipText} arrow>
            <span data-loading>
                <Switch
                    onChange={onChange}
                    disabled={disabled || !access}
                    checked={checked}
                    ref={ref}
                    {...rest}
                />
            </span>
        </Tooltip>
    );
});

export default PermissionSwitch;
