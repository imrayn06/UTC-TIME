import React, { useEffect, useState } from 'react';
import './styles/TimeZoneStyles.css';

const TimeZoneCard = ({ timeZone, label, gmtOffset, utcTime, onUtcTimeChange, onDelete }) => {
    const [convertedTime, setConvertedTime] = useState('');
    const [sliderValue, setSliderValue] = useState(utcTime.getUTCHours());

    useEffect(() => {
        convertTime(utcTime);
        const adjustedHours = utcTime.getUTCHours() + gmtOffset;
        setSliderValue((adjustedHours + 24) % 24);
    }, [utcTime, gmtOffset]);

    const convertTime = (utcDateTime) => {
        const converted = new Intl.DateTimeFormat('en-US', {
            timeZone,
            dateStyle: 'full',
            timeStyle: 'long'
        }).format(utcDateTime);
        setConvertedTime(converted);
    };

    const handleSliderChange = (e) => {
        const updatedHours = parseInt(e.target.value);
        const updatedTime = new Date(utcTime);
        updatedTime.setUTCHours((updatedHours - gmtOffset + 24) % 24);

        if (timeZone === 'UTC' && onUtcTimeChange) {
            onUtcTimeChange(updatedTime);
        } else {
            setSliderValue(updatedHours);
            convertTime(updatedTime);
        }
    };

    return (
        <div className="time-zone-card">
            <div className="time-zone-header">
                <h2>{timeZone}</h2>
                <div className="time-zone-meta">
                    <p>{label}</p>
                    <p>{gmtOffset >= 0 ? `GMT +${gmtOffset}` : `GMT ${gmtOffset}`}</p>
                </div>
                <div className="time-display">{convertedTime}</div>
            </div>
            <div className="time-slider">
                <input
                    type="range"
                    min="0"
                    max="23"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <div className="time-range">
                    <span>12am</span>
                    <span>3am</span>
                    <span>6am</span>
                    <span>9am</span>
                    <span>12pm</span>
                    <span>3pm</span>
                    <span>6pm</span>
                    <span>9pm</span>
                </div>
            </div>
            {onDelete && (
                <button className="delete-button" onClick={onDelete}>
                    Delete
                </button>
            )}
        </div>
    );
};

export default TimeZoneCard;
