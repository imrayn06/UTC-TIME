import React, { useState } from 'react';
import TimeZoneCard from './components/TimeZoneCard';
import './components/styles/TimeZoneStyles.css';

const availableTimeZones = [
    { timeZone: 'America/New_York', label: 'Eastern Time', gmtOffset: -4 },
    { timeZone: 'Europe/London', label: 'London Time', gmtOffset: 0 },
    { timeZone: 'Asia/Tokyo', label: 'Japan Standard Time', gmtOffset: 9 },
    { timeZone: 'Australia/Sydney', label: 'Sydney Time', gmtOffset: 10 },
];

function App() {
    const [utcTime, setUtcTime] = useState(new Date());
    const [selectedTimeZones, setSelectedTimeZones] = useState([]);

    const handleUtcTimeChange = (newUtcTime) => {
        setUtcTime(newUtcTime);
    };

    const addTimeZone = (event) => {
        const selectedZone = availableTimeZones.find(tz => tz.timeZone === event.target.value);
        if (selectedZone && !selectedTimeZones.some(tz => tz.timeZone === selectedZone.timeZone)) {
            setSelectedTimeZones([...selectedTimeZones, selectedZone]);
        }
    };

    const handleDelete = (timeZone) => {
        setSelectedTimeZones(selectedTimeZones.filter(zone => zone.timeZone !== timeZone));
    };

    return (
        <div className="app">
            <div className="time-zone-container">
                <TimeZoneCard
                    timeZone="UTC"
                    label="Universal Time Coordinated"
                    gmtOffset={0}
                    utcTime={utcTime}
                    onUtcTimeChange={handleUtcTimeChange}
                />
                <div className="time-zone-selector">
                    <label htmlFor="timeZoneSelect">Add Time Zone:</label>
                    <select id="timeZoneSelect" onChange={addTimeZone} defaultValue="">
                        <option value="" disabled>Select Time Zone</option>
                        {availableTimeZones.map((zone) => (
                            <option key={zone.timeZone} value={zone.timeZone}>
                                {zone.label} ({zone.timeZone})
                            </option>
                        ))}
                    </select>
                </div>
                {selectedTimeZones.map((zone) => (
                    <TimeZoneCard
                        key={zone.timeZone}
                        timeZone={zone.timeZone}
                        label={zone.label}
                        gmtOffset={zone.gmtOffset}
                        utcTime={utcTime}
                        onDelete={() => handleDelete(zone.timeZone)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
