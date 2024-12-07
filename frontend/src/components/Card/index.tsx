import * as React from 'react';
import { Card, Box, CardMedia, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';   

// 型定義
interface RestaurantCardProps {
  id: string;
  name: string; // 店舗名
  genre: string; // ジャンル（ラーメン、居酒屋など）
  imageUrl: string; // 店舗画像URL
  address: string; // 住所情報
  distance: number; //現在地からの距離
  openingHours: string; 
  priceRange: string;
  phone: string;
  nearestStation: string;
  budget: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, genre, imageUrl, address, distance,openingHours, priceRange, phone, nearestStation, budget }) => {
  const navigate = useNavigate(); // useNavigateフックを使用してページ遷移
  
  // カードクリック時に詳細ページに遷移する処理
  const handleCardClick = () => {
    const restaurantData: RestaurantCardProps = {
      id,
      name,
      genre,
      imageUrl,
      address,
      distance,
      openingHours,
      priceRange,
      phone,
      nearestStation,
      budget
    };
    
    navigate('/detail', { state: restaurantData });
  };

  return (
    <Card 
      id={`restaurant-${id}`} 
      sx={{ display: 'flex', mb: 1, width: '100%', height: '120px', cursor: 'pointer' }}
      onClick={handleCardClick} // クリックイベントを追加
    >
      <CardMedia
        component="img"
        sx={{ width: 100, objectFit: 'cover' }}
        image={imageUrl}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 1.5, overflow: 'hidden' }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
          {genre}
        </Typography>
        <Typography 
          variant="subtitle1" 
          component="div"
          sx={{ fontSize: '0.9rem', fontWeight: 'bold', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          <PlaceIcon sx={{ fontSize: '0.9rem' }} />
          {address}
        </Typography>
        <Typography variant="body2" className={styles.distance}>
          現在地から約 {Math.round(distance)}m
        </Typography>
      </Box>
    </Card>

  );
};

export default RestaurantCard;