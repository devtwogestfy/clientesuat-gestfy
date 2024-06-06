import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from 'utils/stylesCustom';
import { FormattedMessage } from 'react-intl';

const CreateIncidentDialog = ({
  open,
  handleClose,
  services,
  setSelectedOption,
  description,
  setDescription,
  handleCreateIncident,
  errors,
  setErrors
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <CloseIcon />
        </IconButton>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Nueva Incidencia</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ padding: 3 }}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, value) => {
                setSelectedOption(value.id);
                if (value.id) {
                  setErrors((prevErrors) => ({ ...prevErrors, service: '' }));
                }
              }}
              sx={{ width: '100%' }}
              options={services.map((option) => ({ id: option.id, label: option.nombre }))}
              renderInput={(params) => (
                <TextField {...params} label="Servicio" {...(errors.service && { error: errors.service })} helperText={errors.service} />
              )}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={<FormattedMessage id="profile.section.send.message.description" />}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                if (event.target.value.length >= 25) {
                  setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
                }
              }}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCreateIncident} style={styles.buttonPrimary}>
          <FormattedMessage id="dialogs.buttons.send" />
        </Button>
        <Button variant="contained" onClick={handleClose} style={styles.buttonSecondary}>
          <FormattedMessage id="dialogs.buttons.cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateIncidentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  services: PropTypes.array.isRequired,
  selectedOption: PropTypes.number,
  setSelectedOption: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  handleCreateIncident: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired
};

export default CreateIncidentDialog;
