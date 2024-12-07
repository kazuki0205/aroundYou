export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    if (
      typeof lat1 !== 'number' ||
      typeof lng1 !== 'number' ||
      typeof lat2 !== 'number' ||
      typeof lng2 !== 'number'
    ) {
      console.error('Invalid latitude or longitude:', { lat1, lng1, lat2, lng2 });
      return NaN; // 無効なデータの場合
    }
  
    const R = 6371000; // 地球の半径（メートル）
    const toRad = (value: number) => (value * Math.PI) / 180;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // console.log('dLat:', dLat, 'dLon:', dLon, 'a:', a, 'c:', c, 'distance' , distance); // デバッグ
    return distance; // 距離（メートル）
  };
  