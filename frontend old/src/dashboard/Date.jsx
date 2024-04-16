import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Date.css';

function DateInput() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
        />
    );
}

export default DateInput;
