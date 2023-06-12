import React, {useState, useReducer} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FormAddTicket.module.css'
import iconCalendar from'./icon/calendar.svg'
import { CalendarCustom } from '../Calendar/CalendarCustom'
import { db, app } from '../../firebase-config/firebase'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 
import { reducerTicket, State } from '../../store/TicketReducer'


export const AddTicket = () => {
  const [count, setCount] = useState(0)
  const [visibleCalendarLeft, setVisibleCalendarLeft] = useState(false);
  const [visibleCalendarRight, setVisibleCalendarRight] = useState(false);
  const [state, dispatch] = useReducer(reducerTicket, {data: []} as State);
  const navigate = useNavigate();
  // add data
  const [selectDateLeft, setSelectDateLeft] = useState<string | null>(null);
  const [prevSelectDateLeft, setPrevSelectDateLeft] = useState<string | null>(null);
  const [selectDateRight, setSelectDateRight] = useState<string | null>(null);
  const [prevSelectDateRight, setPrevSelectDateRight] = useState<string | null>(null);
  const [applicableDate, setApplicableDate] = useState({date: "", time: ""});
  const [codeTicket, setCodeTicket] = useState("ALT20210501");
  const [expirationDate, setExpirationDate] = useState({date: "", time: ""});
  const [nameEvent, setNameEvent] = useState("Hội chợ triển lãm hàng tiêu dùng 2021");
  const [nameTicket, setNameTicket] = useState("");
  const [priceTicket, setPriceTicket] = useState({
    single_ticket: "", 
    combo_ticket: {
      price: "",
      ticket: ""
  }});
  const [optionsStatus, setOptionsStatus] = useState("1");
  const optionStatus = parseInt(optionsStatus);
  const [index, setIndex] = useState("3");


  if (selectDateLeft !== prevSelectDateLeft) {
    const dateValue = selectDateLeft !== null ? selectDateLeft : "";
    setApplicableDate((prev) => ({
      ...prev,
      date: dateValue,
    }));
    setPrevSelectDateLeft(selectDateLeft);
  }

  if(selectDateRight !== prevSelectDateRight) {
    const dateValueRight = selectDateRight !== null ? selectDateRight : "";
    setExpirationDate((prev) => ({
      ...prev,
      date: dateValueRight,
    }));
    setPrevSelectDateRight(selectDateRight);
  }

  const handleSelectTimeLeft = (e:any) => {
    setApplicableDate((prev) => ({
      ...prev,
      time: e.target.value + ":00"
    }));
  };

  const handleSelectTimeRight = (e:any) => {
    setExpirationDate((prev) => ({
      ...prev,
      time: e.target.value + ":00"
    }))
  }

  const singleTicket = (e:any) => {
    setPriceTicket((prev) => ({
      ...prev,
      single_ticket: e.target.value
    }))
  }

  const comboTicket_Price = (e:any) => {
    setPriceTicket((prev) => ({
      ...prev,
      combo_ticket: {
        ...prev.combo_ticket,
        price: e.target.value
      }
    }))
  }
  const comboTicket_Ticket = (e:any) => {
    setPriceTicket((prev) => ({
      ...prev,
      combo_ticket: {
        ...prev.combo_ticket,
        ticket: e.target.value
      }
    }))
  }

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

  const handleSelect = (e:any) => {
    setOptionsStatus(e.target.value)
  }

  const handleBack = () => {
    window.location.reload();
  }

  // end_Add
  const handleAddTicket = async () => {
    const dataValue = {
        stt: index,
        name_ticket: nameTicket,
        name_event:  "Hội chợ triển lãm hàng tiêu dùng 2021",
        code_ticket: codeTicket,
        expiration_date: expirationDate,
        applicable_date: applicableDate,
        price_ticket: priceTicket,
        status: optionStatus
    }
    const docRef = await addDoc(collection(db, "ListTicket"), dataValue);
    const newData = { id: docRef.id, 
        stt: index,
        name_ticket: nameTicket,
        name_event:  "Hội chợ triển lãm hàng tiêu dùng 2021",
        code_ticket: codeTicket,
        expiration_date: expirationDate,
        applicable_date: applicableDate,
        price_ticket: priceTicket,
        status: optionStatus
    };
    dispatch({type: "ADD_DATA", payload: newData});
    window.location.reload();
    alert("Successfully");
  }

  return (
    <div className={styles.container}>
        <div className={styles.headerTitle}>
          <p>Thêm gói vé</p>
        </div>
        <div className={styles.nameTicket}>
          <div>
            <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tên gói vé <span>*</span></label>
          </div>
          <input type="text" id='nameTicket' onChange={(e) => setNameTicket(e.target.value)} className={styles.inputName} placeholder='Nhập tên gói vé'/>
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
                  <input type="time" placeholder='hh:mm:ss' onChange={handleSelectTimeLeft} className={styles.inputTime}/>
                  {/* <img src={iconOclock} alt="" className={styles.iconCalendar}/> */}
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
                  <input type="time" onChange={handleSelectTimeRight} placeholder='hh:mm:ss'/>
                  {/* <img src={iconOclock} alt="" className={styles.iconCalendar}/> */}
                </div>
              </div>
            </div>
        </div>
        <div className={styles.priceTicket}>
          <div>
            <p className={styles.labelNameTicket}>Ngày hết hạn</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox}/>
            <p className={styles.titleTicket}>Vé lẻ (vnđ/vé) với giá</p>
            <input type="text" onChange={singleTicket} className={styles.priceTicketInput} placeholder='giá vé'/>
            <p className={styles.unit}>/ vé</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox}/>
            <p className={styles.titleTicket}>Combo vé với giá</p>
            <input type="text" onChange={comboTicket_Price} className={styles.priceTicketInput} placeholder='giá vé'/>
            <p className={styles.unit}>/ </p>
            <input type="text" onChange={comboTicket_Ticket} className={styles.priceTicketCombo} placeholder='vé'/>
            <p className={styles.unit}>vé</p>
          </div>
        </div>
        <div className={styles.statusTicket}>
          <div>
            <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tình trạng <span>*</span></label>
          </div>
          <select className={styles.select} onChange={handleSelect}>
              <option value="1">Đang áp dụng</option>
              <option value="2">Tắt</option>
          </select>
        </div>
        <div className={styles.titleBox}>
          <span>*</span>
          <p>Đây là trường bắt buộc</p>
        </div>
        <div className={styles.btn}>
            <button onClick={handleBack} className={styles.btnCancel}>Hủy</button>
            <button onClick={handleAddTicket} className={styles.btnSave}>Lưu</button>
        </div>
        {visibleCalendarLeft && <CalendarCustom className={styles.calendarLeft} onSelectDate={setSelectDateLeft}/>}
        {visibleCalendarRight && <CalendarCustom className={styles.calendarRight} onSelectDate={setSelectDateRight}/>}
    </div>
  )
}
