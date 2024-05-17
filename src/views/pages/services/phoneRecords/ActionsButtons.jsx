import React from 'react';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import dayjs from 'dayjs';
import GetInfoService from 'configuraciones/servicios/service';

// eslint-disable-next-line react/prop-types
function ActionsButtons({ startDate, endDate, code, incomingCheck, onSendData, onResetDates, onDownloadData }) {
    const iconButtonStyles = {
        backgroundColor: 'blue',
        color: '#fff',
        '&:hover': {
            backgroundColor: 'darkblue'
        },
        margin: '2px'
    };

    const handleSearchClick = () => {
        fetchData();
    };
    const infoService = GetInfoService();
    const fetchData = async () => {
        const formattedStartDate = startDate ? dayjs(startDate).format('DD/MM/YYYY') : '';
        const formattedEndDate = endDate ? dayjs(endDate).format('DD/MM/YYYY') : '';
        const id = code.split('-')[1];
        const type = code.split('-')[0];

        try {
            infoService.getPhoneRecord(id, type, formattedStartDate, formattedEndDate, incomingCheck).then((result) => {
                onSendData(result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResetClick = () => {
        onResetDates();
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <IconButton aria-label="Consultar" title="Consultar" sx={iconButtonStyles} onClick={handleSearchClick}>
                <SearchRoundedIcon></SearchRoundedIcon>
            </IconButton>
            <IconButton aria-label="limpiar" title="Limpiar" sx={iconButtonStyles} onClick={handleResetClick}>
                <RestartAltRoundedIcon></RestartAltRoundedIcon>
            </IconButton>
            <IconButton aria-label="descargar" title="Descargar" sx={iconButtonStyles} onClick={onDownloadData}>
                <DownloadRoundedIcon></DownloadRoundedIcon>
            </IconButton>
        </Box>
    );
}

ActionsButtons.propTypes = {
    startDate: PropTypes.instanceOf(dayjs).isRequired,
    endDate: PropTypes.instanceOf(dayjs).isRequired,
    code: PropTypes.string.isRequired,
    incomingCheck: PropTypes.bool
};

export default ActionsButtons;
