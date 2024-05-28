import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessDialog = ({ openSuccess, handleCloseSuccess }) => {
    return (
        <Dialog open={openSuccess} onClose={handleCloseSuccess} aria-labelledby="success-dialog-title">
            <DialogTitle id="success-dialog-title">
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} /> Incidencia creada exitosamente
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    La incidencia ha sido creada exitosamente. ¡Gracias por tu reporte!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSuccess} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessDialog;