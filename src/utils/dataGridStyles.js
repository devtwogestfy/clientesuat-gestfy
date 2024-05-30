import GetCustomization from 'services/customizeService';

const customization = await GetCustomization();
let textColor = '#fff';
if (customization.color === '#FFFF00') {
  textColor = '#000000';
}
const dataGridStyles = (theme) => ({
  root: {
    height: 400,
    width: '100%'
  },
  dataGrid: {
    '& .MuiDataGrid-columnHeaders': {
      //backgroundColor: theme.palette.secondary.dark,
      backgroundColor: customization.color,
      color: textColor
    }
  }
});

export default dataGridStyles;
