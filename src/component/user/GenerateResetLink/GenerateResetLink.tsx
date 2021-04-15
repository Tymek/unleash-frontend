import { Button, TextField, Typography } from '@material-ui/core';
import { AlertTitle, Alert } from '@material-ui/lab';
import classnames from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { useCommonStyles } from '../../../common.styles';
import useLoading from '../../../hooks/useLoading';
import ConditionallyRender from '../../common/ConditionallyRender';
import StandaloneLayout from '../common/StandaloneLayout/StandaloneLayout';
import { useStyles } from './GenerateResetLink.styles';

const GenerateResetLink = () => {
    const [email, setEmail] = useState('');
    const [attempted, setAttempted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attemptedEmail, setAttemptedEmail] = useState('');
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const ref = useLoading(loading);

    const onClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setAttemptedEmail(email);

        await fetch('auth/reset/password-email', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ email }),
        });

        setAttempted(true);
        setLoading(false);
    };

    return (
        <StandaloneLayout>
            <div
                className={classnames(
                    commonStyles.contentSpacingY,
                    commonStyles.flexColumn
                )}
                ref={ref}
            >
                <Typography
                    variant="h2"
                    className={commonStyles.title}
                    data-loading
                >
                    Send a new reset link
                </Typography>
                <ConditionallyRender
                    condition={attempted}
                    show={
                        <Alert severity="success" data-loading>
                            <AlertTitle>Attempted to send email</AlertTitle>
                            We've attempted to send a reset password email to:
                            <strong className={styles.email}>
                                {attemptedEmail}
                            </strong>
                            If you did not receive an email, please verify that
                            you typed in the correct email, and contact your
                            administrator to make sure that you are in the
                            system.
                        </Alert>
                    }
                />
                <form
                    onSubmit={onClick}
                    className={classnames(
                        commonStyles.contentSpacingY,
                        commonStyles.flexColumn,
                        styles.container
                    )}
                >
                    <Typography variant="body1" data-loading>
                        Please provide your email address. If it exists in the
                        system we'll send a new reset link.
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="email"
                        type="email"
                        data-loading
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        data-loading
                        color="primary"
                        className={styles.button}
                        disabled={loading}
                    >
                        <ConditionallyRender
                            condition={!attempted}
                            show={<span>Submit</span>}
                            elseShow={<span>Try again</span>}
                        />
                    </Button>
                </form>
            </div>
        </StandaloneLayout>
    );
};

export default GenerateResetLink;
