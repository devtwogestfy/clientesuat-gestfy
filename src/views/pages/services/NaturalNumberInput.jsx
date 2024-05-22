import * as React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, OutlinedInput } from '@mui/material';

NumberInputBasic.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
};

export default function NumberInputBasic({ id, value, label, onChange }) {
    //return <NumberInput min={0} id={id} value={value} onChange={onChange} required />;
    return (
        <>
            <InputLabel htmlFor="outlined-adornment-email-login">{label}</InputLabel>
            <OutlinedInput id={id} label={label} type="number" inputProps={{}} variant="filled" value={value} onChange={onChange} />
        </>
    );
}
