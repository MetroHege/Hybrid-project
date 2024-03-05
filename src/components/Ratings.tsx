import {useEffect, useState} from 'react';
import {useRating} from '../hooks/apiHooks';
import {MediaItemWithOwner} from '../types/DBTypes';

interface RatingsProps {
  item: MediaItemWithOwner;
  size: number;
}

const Ratings: React.FC<RatingsProps> = ({item, size}) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const {postRating, getRatingByMediaId, getUserRatings} = useRating();

  const ratingChange = (ratingValue: number) => {
    setUserRating(ratingValue);
  };

  const ratingCompleted = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await postRating(item.media_id, userRating, token);
        console.log('rating completed', response);
        fetchRating();
        fetchUserRating();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const fetchRating = async () => {
    try {
      const ratingResult = await getRatingByMediaId(item.media_id);
      setAverageRating(ratingResult.average);
    } catch (error) {
      console.log((error as Error).message);
      setAverageRating(0);
    }
  };

  const fetchUserRating = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userRatings = await getUserRatings(token);
        console.log('userRatings', userRatings);
        const userRating = userRatings.find(
          (rating: MediaItemWithOwner) => rating.media_id === item.media_id,
        );
        if (userRating) {
          setUserRating(userRating.rating_value);
        }
      }
    } catch (error) {
      console.log('fetchUserRating', (error as Error).message);
      setUserRating(0);
    }
  };

  useEffect(() => {
    fetchRating();
    fetchUserRating();
  }, []);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {averageRating === 0 ? (
        <p>No ratings yet</p>
      ) : (
        <>
          {userRating > 0 && <p>Your rating: {userRating}</p>}
          <p>Average rating: {averageRating}</p>
        </>
      )}
      <StarRating
        onChange={ratingChange}
        rating={averageRating}
        onRatingEnd={ratingCompleted}
        starSize={size}
      />
    </div>
  );
};

export default Ratings;
