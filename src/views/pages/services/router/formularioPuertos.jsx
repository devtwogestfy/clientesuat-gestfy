import React, { useState, useEffect } from 'react';
import { CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import Icono from '@mui/icons-material/ImportExport';
import Paper from '@mui/material/Paper';
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
    const [rows, setRows] = useState([]);

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
                                        <TextField
                                            label="Ingrese su IP"
                                            variant="standard"
                                            value={row.ip}
                                            onChange={(e) => handleChange(row.id, 'ip', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Ingrese su Puerto"
                                            variant="standard"
                                            value={row.extport}
                                            onChange={(e) => handleChange(row.id, 'extport', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Ingrese su Puerto"
                                            variant="standard"
                                            value={row.intport}
                                            onChange={(e) => handleChange(row.id, 'intport', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Ingrese su Protocolo"
                                            variant="standard"
                                            value={row.protocol}
                                            onChange={(e) => handleChange(row.id, 'protocol', e.target.value)}
                                        />
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
