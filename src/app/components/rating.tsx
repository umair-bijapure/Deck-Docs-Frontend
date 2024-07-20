import React, { useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';

interface RatingProps {
    defaultValue?: number | number[]; // Adjusted to accept a single number or an array of numbers
    onChange?: (value: number | number[]) => void; // Adjusted to accept a single number or an array of numbers
}

const Rating: React.FC<RatingProps> = ({ defaultValue = 0, onChange }) => {
    const [rating, setRating] = useState<number | number[]>(defaultValue as number | number[]); // Type assertion here

    const factorLabels = [
        'Punctuality',
        'Quality of Work',
        'Teamwork',
        'Communication Skills',
        'Adherence to Safety Protocols',
    ];

    const handleClick = (newValue: number, index: number) => {
        let newRatings: number | number[];
        if (Array.isArray(rating)) {
            newRatings = [...rating];
            newRatings[index] = newValue;
        } else {
            newRatings = newValue;
        }
        setRating(newRatings);
        if (onChange) {
            onChange(newRatings);
        }
    };

 const renderStar = (index: number) => {
        const value = Array.isArray(rating) ? rating[index] : rating;
        const wholePart = Math.floor(value as number);
        const decimalPart = value as number - wholePart;
        const starCount = wholePart + (decimalPart >= 0.25 ? 1 : 0);

        return (
            <div key={index} style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <React.Fragment key={i}>
                        {i <= starCount ? (
                            <StarFilled key={i} onClick={() => handleClick(i, index)} style={{ color: '#faad14' }} />
                        ) : (
                            <StarOutlined key={i} onClick={() => handleClick(i - 0.5, index)} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div>
            {factorLabels.map((label, index) => (
                <div className='sm:flex items-center justify-between gap-x-2 gap-y-2' key={index}>
                    <span>{label}</span>
                    {renderStar(index)}
                </div>
            ))}
        </div>
    );
};

export default Rating;
