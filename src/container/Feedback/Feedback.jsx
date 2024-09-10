import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import StarRating from './StarRating';
import './Feedback.css';

const Feedback = () => {
    const location = useLocation();
    const { menuItems = [], userId } = location.state || {};
    // console.log('User ID from location state:', userId);

    const [menuId, setMenuId] = useState('');
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const feedbackData = {
            user_id: userId,
            menu_id: menuId,
            Rating: rating,
            Comment: comment,
        };
        // console.log('Submitting feedback with data:', feedbackData);


        fetch('http://localhost:8081/api/add/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setSuccessMessage('Feedback submitted successfully!');
            setMenuId('');
            setRating(null);
            setComment('');
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage('Failed to submit feedback. Please try again.');
        });
    };

    return (
        <div className='feedback-container'>
            <h1>Restaurant Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="menuId">Select Menu Item:</label>
                    <select
                        id="menuId"
                        value={menuId}
                        onChange={(e) => setMenuId(e.target.value)}
                        required
                    >
                        <option value="">--Select Menu Item--</option>
                        {menuItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.Item_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Rate the Menu Item:</label>
                    <StarRating rating={rating} setRating={setRating} />
                </div>

                <div>
                    <label htmlFor="comment">Additional Comments:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        cols="50"
                        placeholder="Your feedback here..."
                    ></textarea>
                </div>

                <button type="submit">Submit Feedback</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Feedback;
