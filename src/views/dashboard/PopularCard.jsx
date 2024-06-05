import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { FormattedMessage } from 'react-intl';

const PopularCard = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
       <BajajAreaChartCard />
       )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
