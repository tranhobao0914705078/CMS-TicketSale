import React, { useState } from 'react'
import styles from './FormUpdateTicket.module.css'
import iconCalendar from'./icon/calendar.svg'
import iconOclock from './icon/oclock.svg'
import iconDown from'./icon/icondown.svg'
import { CalendarCustom } from '../Calendar/CalendarCustom'

export const UpdateTicket = () => {
  const [count, setCount] = useState(0)
  const [visibleCalendarLeft, setVisibleCalendarLeft] = useState(false);
  const [visibleCalendarRight, setVisibleCalendarRight] = useState(false);
  const [selectDateLeft, setSelectDateLeft] = useState<string | null>(null);
  const [selectDateRight, setSelectDateRight] = useState<string | null>(null);

  const handleCalendarLeft = () => {
    setCount(count + 1);
    if(count  === 0){
      setVisibleCalendarLeft(true);
    }else if(count === 1){
      setVisibleCalendarLeft(false);
      setCount(0)
    }
  }

  const handleCalendarRight = () => {
    setCount(count + 1);
    if(count  === 0){
      setVisibleCalendarRight(true);
    }else if(count === 1){
      setVisibleCalendarRight(false);
      setCount(0)
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.headerTitle}>
          <p>Cập nhật thông tin gói vé</p>
        </div>
        <div className={styles.nameTicket}>
          <div>
            <div>
              <label htmlFor="nameTicket" className={styles.labelNameTicket}>Mã sự kiện <span>*</span></label>
            </div>
            <input type="text" id='nameTicket' className={styles.inputCode} placeholder='Nhập tên gói vé'/>
          </div>
          <div>
            <div>
              <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tên sự kiện <span>*</span></label>
            </div>
            <input type="text" id='nameTicket' className={styles.inputName} placeholder='Nhập tên sự kiện'/>
          </div>
        </div>
        <div className={styles.dateTicket}>
            <div className={styles.startTime}>
              <div>
                <p className={styles.labelNameTicket}>Ngày áp dụng</p>
              </div>
              <div className={styles.Time}>
                <div className={styles.TimeLeft} onClick={handleCalendarLeft}>
                  <input type="text" value={selectDateLeft || ''} placeholder='dd/mm/yy'/>
                  <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
                </div>
                <div className={styles.TimeRight}>
                  <input type="text" value="08:00:00" placeholder='hh:mm:ss'/>
                  <img src={iconOclock} alt="" className={styles.iconCalendar}/>
                </div>
              </div>
            </div>
            <div className={styles.endTime}>
              <div>
                <p className={styles.labelNameTicket}>Ngày hết hạn</p>
              </div>
              <div className={styles.Time}>
                <div className={styles.TimeLeft} onClick={handleCalendarRight}>
                  <input type="text" value={selectDateRight || ''} placeholder='dd/mm/yy'/>
                  <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
                </div>
                <div className={styles.TimeRight}>
                  <input type="text" value="23:00:00" placeholder='hh:mm:ss'/>
                  <img src={iconOclock} alt="" className={styles.iconCalendar}/>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.priceTicket}>
          <div>
            <p className={styles.labelNameTicket}>Giá vé áp dụng</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox}/>
            <p className={styles.titleTicket}>Vé lẻ (vnđ/vé) với giá</p>
            <input type="text" className={styles.priceTicketInput} placeholder='giá vé'/>
            <p className={styles.unit}>/ vé</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox}/>
            <p className={styles.titleTicket}>Combo vé với giá</p>
            <input type="text" className={styles.priceTicketInput} placeholder='giá vé'/>
            <p className={styles.unit}>/ </p>
            <input type="text" className={styles.priceTicketCombo} placeholder='giá vé'/>
            <p className={styles.unit}>vé</p>
          </div>
        </div>
        <div className={styles.statusTicket}>
          <div>
            <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tên gói vé <span>*</span></label>
          </div>
          <select className={styles.select}>
              <option>Đang áp dụng</option>
              <option>Tắt</option>
          </select>
        </div>
        <div className={styles.titleBox}>
          <span>*</span>
          <p>Đây là trường bắt buộc</p>
        </div>
        <div className={styles.btn}>
            <button className={styles.btnCancel}>Hủy</button>
            <button className={styles.btnSave}>Lưu</button>
        </div>
        {visibleCalendarLeft && <CalendarCustom className={styles.calendarLeft} onSelectDate={setSelectDateLeft}/>}
        {visibleCalendarRight && <CalendarCustom className={styles.calendarRight} onSelectDate={setSelectDateRight}/>}
    </div>
  )
}
