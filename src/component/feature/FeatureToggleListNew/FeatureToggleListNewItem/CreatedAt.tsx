import { Tooltip } from '@material-ui/core';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMD, formatDateYMDHMS } from 'utils/formatDate';

interface CreatedAtProps {
    time: string;
}

const CreatedAt = ({ time }: CreatedAtProps) => {
    const { locationSettings } = useLocationSettings();

    return (
        <Tooltip
            title={`Created at ${formatDateYMDHMS(
                time,
                locationSettings.locale
            )}`}
        >
            <span>{formatDateYMD(time, locationSettings.locale)}</span>
        </Tooltip>
    );
};

export default CreatedAt;
