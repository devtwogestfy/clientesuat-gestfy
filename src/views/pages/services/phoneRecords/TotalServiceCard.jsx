import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import FourGMobiledataRoundedIcon from '@mui/icons-material/FourGMobiledataRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

const CardWrapper = styled(MainCard)(({ theme, backgroundcolor, backgroundcard }) => ({
    backgroundColor: backgroundcolor,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: backgroundcard,
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: backgroundcard,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const icons = {
    phone: PhoneRoundedIcon,
    message: MessageRoundedIcon,
    fourg: FourGMobiledataRoundedIcon
};

const TotalServiceCard = ({ isLoading, title, total, colorCard, colorIcon, backgroundCard, icon }) => {
    const IconComponent = icons[icon] || Phone;
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false} backgroundcolor={colorCard} backgroundcard={backgroundCard}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: backgroundCard,
                                                color: colorIcon,
                                                mt: 1
                                            }}
                                        >
                                            <IconComponent fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container direction="column" alignItems="left">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.2 }}>
                                            {total}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 0.25, mb: 0.75 }}>
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalServiceCard.propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    total: PropTypes.string,
    backgroundCard: PropTypes.string,
    colorCard: PropTypes.string,
    colorIcon: PropTypes.string,
    icon: PropTypes.string
};

export default TotalServiceCard;
