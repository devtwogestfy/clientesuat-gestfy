import React from 'react';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';

const PhoneRecordsPage = () => {
    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent></CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default PhoneRecordsPage;
