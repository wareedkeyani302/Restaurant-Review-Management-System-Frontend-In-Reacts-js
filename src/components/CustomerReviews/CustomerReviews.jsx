import React, { useEffect, useState } from 'react';
import StarRating from '../Istar/StarRating';
import './CustomerReviews.css';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/get/Rated/MenuItem');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReviews(data);
                setShouldRerender(prevState => !prevState);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [shouldRerender]);

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error fetching reviews: {error}</div>;
    }
    const getImageUrl = (path) => {
        if (!path) {
            return '';
        }
        return `http://192.168.3.178:8081/${path.replace(/\\/g, '/')}`;
    };

    return (
        <div className="customer-reviews">
            <h2>Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <img src={getImageUrl(review.Image)} alt={review.Item_name} />
                            <h3>{review.Item_name}</h3>
                            <p><strong>Description:</strong> {review.Description}</p>
                            <StarRating rating={review.Rating} />
                            <p><strong>Comment:</strong> {review.Comment || 'No comment provided'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerReviews;
