import React from 'react';
import { FormLabel, OutlinedInput, Box } from '@mui/material';

const NaturalNumberInput = ({ id, label, value, onChange }) => {
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        // Permitir solo números (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    return (
        <Box mb={2}>
            <FormLabel htmlFor={id} required>
                {label}
            </FormLabel>
            <OutlinedInput
                id={id}
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder={label}
                required
                inputProps={{ 'aria-label': label }}
            />
        </Box>
    );
};

export default NaturalNumberInput;