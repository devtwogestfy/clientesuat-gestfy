import React, { useState, useEffect } from 'react';
import {
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    FormHelperText
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import Icono from '@mui/icons-material/ImportExport';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

function FormularioPuertos({ portsData, funcionPuertos }) {
    // Función para validar direcciones IP
    const isValidIP = (ip) => {
        const ipRegex =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    };

    // Función para validar puertos
    const isValidPort = (port) => {
        const portNumber = parseInt(port, 10);
        return portNumber >= 1 && portNumber <= 65534;
    };

    const [rows, setRows] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (portsData) {
            const formattedRows = portsData.map((item) => ({
                id: item.id,
                ip: item.ip || '',
                extport: item.desde || '',
                intport: item.hasta || '',
                protocol: item.protocolo || ''
            }));
            setRows(formattedRows);
        }
    }, [portsData]);

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), ip: '', extport: '', intport: '', protocol: '' }]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

        if (field === 'ip') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: {
                    ...prevErrors[id],
                    ip: !isValidIP(value) ? 'IP no válida' : ''
                }
            }));
        }

        if (field === 'extport' || field === 'intport') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: {
                    ...prevErrors[id],
                    [field]: !isValidPort(value) ? 'Introduzca un puerto válido (1-65534)' : ''
                }
            }));
        }
    };

    const ActualizarData = () => {
        funcionPuertos('ports', rows);
    };

    return (
        <MainCard
            content={false}
            title={
                <>
                    <Icono /> Redirección de Puertos
                </>
            }
            secondary={
                <CardSecondaryAction
                    funcionOnClick={ActualizarData}
                    title="Actualizar"
                    color="primary"
                    icon={<SaveIcon fontSize="small" />}
                />
            }
        >
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>IP</TableCell>
                                <TableCell>Puerto Externo</TableCell>
                                <TableCell>Puerto Interno</TableCell>
                                <TableCell>Protocolo</TableCell>
                                <TableCell>
                                    <IconButton aria-label="add" color="primary" onClick={handleAddRow}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <FormControl variant="standard" fullWidth error={!!errors[row.id]?.ip}>
                                            <TextField
                                                label="Ingrese su IP"
                                                variant="standard"
                                                value={row.ip}
                                                onChange={(e) => handleChange(row.id, 'ip', e.target.value)}
                                                error={!!errors[row.id]?.ip}
                                            />
                                            {errors[row.id]?.ip && <FormHelperText>{errors[row.id]?.ip}</FormHelperText>}
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl variant="standard" fullWidth error={!!errors[row.id]?.extport}>
                                            <TextField
                                                label="Ingrese su Puerto"
                                                variant="standard"
                                                value={row.extport}
                                                onChange={(e) => handleChange(row.id, 'extport', e.target.value)}
                                                error={!!errors[row.id]?.extport}
                                            />
                                            {errors[row.id]?.extport && (
                                                <FormHelperText>{errors[row.id]?.extport}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl variant="standard" fullWidth error={!!errors[row.id]?.intport}>
                                            <TextField
                                                label="Ingrese su Puerto"
                                                variant="standard"
                                                value={row.intport}
                                                onChange={(e) => handleChange(row.id, 'intport', e.target.value)}
                                                error={!!errors[row.id]?.intport}
                                            />
                                            {errors[row.id]?.intport && (
                                                <FormHelperText>{errors[row.id]?.intport}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel id={`protocol-label-${row.id}`}>Protocolo</InputLabel>
                                            <Select
                                                labelId={`protocol-label-${row.id}`}
                                                value={row.protocol}
                                                onChange={(e) => handleChange(row.id, 'protocol', e.target.value)}
                                                label="Protocolo"
                                            >
                                                <MenuItem value="1">UDP</MenuItem>
                                                <MenuItem value="2">TCP</MenuItem>
                                                <MenuItem value="3">UDP/TCP</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteRow(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </MainCard>
    );
}

FormularioPuertos.propTypes = {
    portsData: PropTypes.array.isRequired,
    funcionPuertos: PropTypes.func.isRequired
};

export default FormularioPuertos;
