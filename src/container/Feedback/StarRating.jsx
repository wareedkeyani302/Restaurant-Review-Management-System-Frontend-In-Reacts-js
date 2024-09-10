import React, { useState } from 'react';
import './StarRating.css'; 

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    const handleMouseEnter = (index) => setHover(index);
    const handleMouseLeave = () => setHover(null);
    const handleClick = (index) => setRating(index);

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
