import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import TrainIcon from '@mui/icons-material/Train';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface RestaurantDetailProps {
  name: string;
  genre: string;
  address: string;
  budget: string;
  openingHours: string;
  priceRange: string;
  phone: string;
  nearestStation: string;
  imageUrl: string;
}

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = location.state as RestaurantDetailProps;
//   console.log('Detail page data:', location.state);

  React.useEffect(() => {
    // データが存在しない場合はホームに戻る
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!restaurant) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.detailContainer}>
      <IconButton onClick={handleBack} className={styles.backButton}>
        <ArrowBackIcon />
      </IconButton>

      <div className={styles.imageContainer}>
        <img src={restaurant.imageUrl} alt={restaurant.name} />
      </div>

      <Box className={styles.infoContainer}>
        <Typography variant="h5" className={styles.restaurantName}>
          {restaurant.name}
        </Typography>

        <Typography variant="subtitle1" className={styles.genre}>
          {restaurant.genre}
        </Typography>

        <Stack spacing={2} className={styles.detailsStack}>
          <Box display="flex" alignItems="center">
            <PlaceIcon />
            <Typography className={styles.detailText}>
              {restaurant.address}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <AccessTimeIcon />
            <Typography className={styles.detailText}>
              {restaurant.openingHours}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <MonetizationOnIcon />
            <Typography className={styles.detailText}>
              {restaurant.priceRange}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <TrainIcon />
            <Typography className={styles.detailText}>
              {restaurant.nearestStation}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default Detail;