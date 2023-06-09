import React, { useState } from 'react'
import styles from './styles.module.css'
import iconCalendar from './icon/icon.svg'
import { CalendarCustom } from '../Calendar/CustomCalendar/CustomCalendar'

export const ChangeTicket = () => {
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [visible, setVisible] = useState(true);
    const [count, setCount] = useState(0);
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const handlClick = () => {
        setVisible(false);
    }
    const handleClickCalendar = () => {
        setCount(count + 1);
        if(count === 0){
            setVisibleCalendar(true)
        }else if(count === 1){
            setVisibleCalendar(false)
            setCount(0)
        }
    }
  return (
    <div>
        {visible && 
            <div className={styles.container}>
            <div>
                <p className={styles.header_title}>Đổi ngày sử dụng vé</p>
            </div>
            <div className={styles.content}>
                <div className={styles.content_title}>
                    <p>Số vé</p>
                    <p className={styles.content_value}>PKG20210502</p>
                </div>
                <div className={styles.content_title}>
                    <p>Số vé</p>
                    <p className={styles.content_value}>Vé cổng - Gói sự kiện</p>
                </div>
                <div className={styles.content_title}>
                    <p>Tên sự kiện</p>
                    <p className={styles.custom}>Hội trợ triển lãm hàng tiêu dùng 2021</p>
                </div>
                <div className={`${styles.content_title} ${styles.content_pointer}`}>
                    <p>Hạn sử dụng</p>
                    <div className={styles.Calendar} onClick={handleClickCalendar}>
                        <p>{date}</p>
                        <img src={iconCalendar} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={handlClick} className={styles.btn_cancle}>Hủy</button>
                <button className={styles.btn_save}>Lưu</button>
            </div>
        </div>
        }
        {visibleCalendar && <div className={styles.calendarCustom}><CalendarCustom /></div>}
    </div>
  )
}
