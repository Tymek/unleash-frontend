import { TextField } from '@material-ui/core';
import { useStyles } from './Input.styles.ts';

interface IInputProps {
    label: string;
    placeholder?: string;
    error?: boolean;
    errorText?: string;
    style?: Object;
    className?: string;
    value: string;
    onChange: (e: any) => any;
}

const Input = ({
    label,
    placeholder,
    error,
    errorText,
    style,
    className,
    value,
    onChange,
}: IInputProps) => {
    const styles = useStyles();
    return (
        <div className={styles.inputContainer}>
            <TextField
                size="small"
                variant="outlined"
                label={label}
                placeholder={placeholder}
                error={error}
                helperText={errorText}
                style={style}
                className={className ? className : ''}
                value={value}
                onChange={onChange}
                FormHelperTextProps={{
                    classes: {
                        root: styles.helperText,
                    },
                }}
            />
        </div>
    );
};

export default Input;
