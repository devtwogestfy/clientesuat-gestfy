import React, { useState } from 'react';
import { CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import Icono from '@mui/icons-material/ImportExport';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line react/prop-types
function FormularioPuertos({ funcionPuertos }) {
    const [rows, setRows] = useState([]);

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), ip: '', puertoExterno: '', puertoInterno: '', protocolo: '' }]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
        console.log(rows);
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
                                            value={row.puertoExterno}
                                            onChange={(e) => handleChange(row.id, 'puertoExterno', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Ingrese su Puerto"
                                            variant="standard"
                                            value={row.puertoInterno}
                                            onChange={(e) => handleChange(row.id, 'puertoInterno', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Ingrese su Protocolo"
                                            variant="standard"
                                            value={row.protocolo}
                                            onChange={(e) => handleChange(row.id, 'protocolo', e.target.value)}
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

export default FormularioPuertos;
