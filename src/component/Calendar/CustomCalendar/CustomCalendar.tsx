import React, { useState } from 'react'
import styles from'./CustomCalendar.module.css';
import { CalendarCustom as Calendar } from '../CalendarCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export const CalendarCustom = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    }

    return (
        <Calendar className={styles.customCalendar}/>
    );
}