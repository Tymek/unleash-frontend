import { Alert } from '@material-ui/lab';
import { ReactNode } from 'react';

export const SegmentDocsExperimental = () => {
    return (
        <Alert severity="warning">
            Segments is an experimental feature available to some Unleash Pro
            and Unleash Enterprise users. <SegmentDocsLink />
        </Alert>
    );
};

export const SegmentDocsValuesLimit = () => {
    return (
        <Alert severity="warning">
            Segments is an experimental feature available to some users.
            Currently, they are limited to at most 100 values across all
            constraints. <SegmentLimitsLink />
        </Alert>
    );
};

export const SegmentDocsStrategyLimit = () => {
    return (
        <Alert severity="warning">
            Segments is an experimental feature available to some users.
            Currently, strategies are limited to at most 5 segments.{' '}
            <SegmentLimitsLink />
        </Alert>
    );
};

const SegmentDocsLink = () => {
    return (
        <>
            <a
                href={segmentsDocsLink}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'inherit' }}
            >
                Read more about segments
            </a>
            .
        </>
    );
};

const SegmentLimitsLink = () => {
    return (
        <>
            Please{' '}
            <a
                href="https://slack.unleash.run"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'inherit' }}
            >
                get in touch
            </a>{' '}
            if you would like this limit increased.
        </>
    );
};

export const segmentsDocsLink = 'https://docs.getunleash.io/reference/segments';
