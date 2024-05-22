import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

NumberInputBasic.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
};

export default function NumberInputBasic({ id, value, onChange }) {
    //return <NumberInput min={0} id={id} value={value} onChange={onChange} required />;
    return (
        <TextField
            id={id}
            label="nombre"
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            variant="filled"
            value={value}
            onChange={onChange}
        />
    );
}
