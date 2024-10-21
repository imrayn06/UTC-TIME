import React, { useState } from 'react';

const TimeSlider = ({ min, max, initialValue }) => {
    const [value, setValue] = useState(initialValue);

    return (
        <div className="time-slider-container">
            <input 
                type="range" 
                min={min} 
                max={max} 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="slider"
            />
        </div>
    );
};

export default TimeSlider;
