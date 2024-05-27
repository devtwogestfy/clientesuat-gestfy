const dataGridStyles = (theme) => ({
    root: {
        height: 400,
        width: '100%'
    },
    dataGrid: {
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.secondary.dark,
            color: '#fff'
        }
    }
});

export default dataGridStyles;
