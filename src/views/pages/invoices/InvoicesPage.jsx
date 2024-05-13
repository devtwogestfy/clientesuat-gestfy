/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import { Badge } from '@mui/material';
import Acciones from './Acciones';
import NumberInvoicesCard from './NumberInvoicesCard';
import LastInvoiceCard from './LastInvoiceCard';
import TotalDebtCard from './TotalDebtCard';
import { fDate } from 'utils/format-date';

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
                {!title && <Box sx={{ p: 1.15 }} />}
            </Box>
        </Card>
        {data && (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.color}
                    </Typography>
                </Grid>
            </Grid>
        )}
    </>
);

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

const InvoicesPage = () => {
    const [ultimafactura, setUltimafactura] = useState(null);
    const [pendiente, setPendiente] = useState(null);
    const [numeroFacturas, setNumeroFacturas] = useState(null);
    const [dataInvoices, setDataInvoices] = useState([]);

    const infoService = GetInfoService();
    infoService.getInvoicesSummary().then((summaryData) => {
        setPendiente(summaryData.pendiente);
        setNumeroFacturas(summaryData.numerofacturas);
        setUltimafactura(summaryData.ultimafactura);
    });

    const fetchData = async () => {
        infoService.getDataInvoices().then((invoices) => {
            setDataInvoices(invoices.items);
            console.log(invoices.items);
        });
    };

    const descargarFactura = async (id) => {
        infoService.descargarFactura(id).then((response) => {
            let f = blobToFile(response.file, response.filename);
            let fileUrl = URL.createObjectURL(f);

            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', fileUrl);
            link.setAttribute('download', response.filename);
            link.click();
        });
    };

    const blobToFile = (theBlob, fileName) => {
        console.log(theBlob);
        console.log(fileName);
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
    };

    // Función para asignar clases de estilo a las filas alternas
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Descargar',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Acciones funcionOnClicDescargar={descargarFactura} factura_id={params.row.id} />
                    </Box>
                );
            }
        },
        {
            field: 'fechafactura',
            headerName: 'Fecha',
            width: 150,
            valueGetter: (value, row) => `${fDate(row.fechafactura) || ''}`
        },
        {
            field: 'serie',
            headerName: 'Serie',
            type: 'number',
            width: 110
        },
        {
            field: 'numero',
            headerName: 'Número',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160
        },
        {
            field: 'neto',
            headerName: 'Importe',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Badge badgeContent={`$ ${params.row.neto}`} color="success"></Badge>
                    </Box>
                );
            }
        },
        {
            field: 'cobrado',
            headerName: 'Pendiente',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Badge badgeContent={`$ ${params.row.cobrado.toFixed(2)}`} color="error"></Badge>
                    </Box>
                );
            }
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <NumberInvoicesCard title="Facturas" total={parseInt(numeroFacturas)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <LastInvoiceCard title="Última Factura" total={parseFloat(ultimafactura)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TotalDebtCard title="Deuda Total" total={parseFloat(pendiente)} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowClassName={getRowClassName} // Aplicar estilos de cebra a las filas
                            rows={dataInvoices}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5
                                    }
                                }
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InvoicesPage;
