import React, { useState, useReducer, useEffect } from 'react'
import styles from './FormUpdateTicket.module.css'
import iconCalendar from'./icon/calendar.svg'
import iconOclock from './icon/oclock.svg'
import iconDown from'./icon/icondown.svg'
import { CalendarCustom } from '../Calendar/CalendarCustom'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { reducerTicket, State } from '../../store/TicketReducer'
import { db, app } from '../../firebase-config/firebase'

export const UpdateTicket = ({ currentId }: {currentId: string}) => {
  const [count, setCount] = useState(0)
  const [visibleCalendarLeft, setVisibleCalendarLeft] = useState(false);
  const [visibleCalendarRight, setVisibleCalendarRight] = useState(false);
  
  const db = getFirestore();
  const [codeTicket, setCodeTicket]= useState("");
  const [nameEvent, setNameEvent] = useState("");
  const [applicableDate, setApplicableDate] = useState("");
  const [applicableTime, setApplicableTime] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [priceTicket, setPriceTicket] = useState("");
  const [comboPrice, setComboPrice] = useState("");
  const [comboTicket, setComboTicket] = useState("");
  const [status, setStatus] = useState(0);

  const [applicableUpdate, setApplicableUpdate] = useState({date: "", time: ""});
  const [expirationUpdate, setExpirationUpdate] = useState({date: "", time: ""});
  const [priceTicketUpdate, setPriceTicketUpdate] = useState({
    single_ticket: "", 
    combo_ticket: {
      price: "",
      ticket: ""
  }});

  const [optionsStatus, setOptionsStatus] = useState("");
  const optionStatus = parseInt(optionsStatus);

  const[ state, dispatch] = useReducer(reducerTicket, { data: []} as State);

  const [selectDateLeft, setSelectDateLeft] = useState<string | null>(null);
  const [prevSelectDateLeft, setPrevSelectDateLeft] = useState<string | null>(null);
  const [selectDateRight, setSelectDateRight] = useState<string | null>(null);
  const [prevSelectDateRight, setPrevSelectDateRight] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      const newRef = doc(db, "ListTicket", currentId);
      const snapShot = await getDoc(newRef);
      if(snapShot.exists()){
        const data = snapShot.data();
        setCodeTicket(data.code_ticket);
        setNameEvent(data.name_event);
        setApplicableDate(data.applicable_date.date);
        setApplicableTime(data.applicable_date.time);
        setExpirationDate(data.expiration_date.date);
        setExpirationTime(data.expiration_date.time);
        setPriceTicket(data.price_ticket.single_ticket);
        setComboPrice(data.price_ticket.combo_ticket.price);
        setComboTicket(data.price_ticket.combo_ticket.ticket);
        setStatus(data.status);
      }
    }
    fetchData();
  }, [currentId, db]);

  if (selectDateLeft !== prevSelectDateLeft) {
    const dateValue = selectDateLeft !== null ? selectDateLeft : applicableDate;
    setApplicableUpdate((prev) => ({
      ...prev,
      date: dateValue
    }));
    setPrevSelectDateLeft(selectDateLeft);
  }

  if(selectDateRight !== prevSelectDateRight){
    const dateValue = selectDateRight !== null ? selectDateRight : expirationDate;
    setExpirationUpdate((prev) => ({
      ...prev,
      date: dateValue
    }));
    setPrevSelectDateRight(selectDateRight);
  }

  const handleUpdate = async(
      id: string, 
      newCode: string, 
      newDateApplicable: {date: string, time: string},
      newDateExpiration: {date: string, time: string},
      newPrice: {single_ticket: string, combo_ticket:{ price: string, ticket: string}},
      newStatus: Number
      
    ) => {
    setApplicableUpdate((prev) => ({
      ...prev,
      time: applicableTime
    }));
    setExpirationUpdate((prev) => ({
      ...prev,
      time: expirationTime
    }))
    setPriceTicketUpdate((prev) => ({
      ...prev,
      single_ticket: priceTicket
    }))
    setPriceTicketUpdate((prev) => ({
      ...prev,
      combo_ticket: {
        ...prev.combo_ticket,
        price: comboPrice,
        ticket: comboTicket
      }
    }))
    const dataUpdate = {
      code_ticket: newCode,
      applicable_date: newDateApplicable.date !== "" ? 
        { date: newDateApplicable.date, time: applicableTime } : { date: applicableDate, time: applicableTime },
      expiration_date: newDateExpiration.date !== "" ? 
        { date: newDateExpiration.date, time: expirationTime } : { date: expirationDate, time: expirationTime},
      price_ticket: newPrice.single_ticket !== "" ? 
        { single_ticket: newPrice.single_ticket, combo_ticket: { price: comboPrice, ticket: comboTicket}}
          : newPrice.combo_ticket.price !== "" ? { price: newPrice.combo_ticket.price, ticket: comboTicket} 
          : { single_ticket: priceTicket, combo_ticket: { price: comboPrice, ticket: comboTicket}
        },
      status: newStatus || status
    }
    const itemRef = doc(db, "ListTicket", currentId);
    await updateDoc(itemRef, dataUpdate);
    const updateDB = state.data.map((item) => {
      if(item.id === id){
        return {
          ...item, 
          code_ticket: newCode,
          applicable_date: newDateApplicable,
          expiration_date: newDateExpiration,
          price_ticket: newPrice,
          status: newStatus
        }
      }
      return item;
    });
    dispatch({ type: "UPDATE_DATA", payload: updateDB});
    alert("Updated!!!");
    window.location.reload();
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

  const handleBack = () => {
    window.location.reload();
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
            <input type="text" id='nameTicket' className={styles.inputCode} value={codeTicket} onChange={e => setCodeTicket(e.target.value)}/>
          </div>
          <div>
            <div>
              <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tên sự kiện <span>*</span></label>
            </div>
            <input type="text" id='nameTicket' className={styles.inputName} value={nameEvent}/>
          </div>
        </div>
        <div className={styles.dateTicket}>
            <div className={styles.startTime}>
              <div>
                <p className={styles.labelNameTicket}>Ngày áp dụng</p>
              </div>
              <div className={styles.Time}>
                <div className={styles.TimeLeft} onClick={handleCalendarLeft}>
                  <input type="text" value={selectDateLeft || applicableDate} />
                  <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
                </div>
                <div className={styles.TimeRight}>
                  <input type="time" value={applicableTime} onChange={e => setApplicableTime(e.target.value + ":00")}/>
                </div>
              </div>
            </div>
            <div className={styles.endTime}>
              <div>
                <p className={styles.labelNameTicket}>Ngày hết hạn</p>
              </div>
              <div className={styles.Time}>
                <div className={styles.TimeLeft} onClick={handleCalendarRight}>
                  <input type="text" value={selectDateRight || expirationDate} />
                  <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
                </div>
                <div className={styles.TimeRight}>
                  <input type="time"value={expirationTime} onChange={e => setExpirationTime(e.target.value + ":00")}/>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.priceTicket}>
          <div>
            <p className={styles.labelNameTicket}>Giá vé áp dụng</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox} checked={priceTicket !== ""}/>
            <p className={styles.titleTicket}>Vé lẻ (vnđ/vé) với giá</p>
            <input type="text" className={styles.priceTicketInput} value={priceTicket} onChange={e => setPriceTicket(e.target.value)}/>
            <p className={styles.unit}>/ vé</p>
          </div>
          <div className={styles.groupTicket}>
            <input type="checkbox" className={styles.checkbox} checked={comboPrice !== ""}/>
            <p className={styles.titleTicket}>Combo vé với giá</p>
            <input type="text" className={styles.priceTicketInput} value={comboPrice || ''} placeholder='Giá vé' onChange={e => setComboPrice(e.target.value)}/>
            <p className={styles.unit}>/ </p>
            <input type="text" className={styles.priceTicketCombo} value={comboTicket || ''} placeholder='vé' onChange={e => setComboTicket(e.target.value)}/>
            <p className={styles.unit}>vé</p>
          </div>
        </div>
        <div className={styles.statusTicket}>
          <div>
            <label htmlFor="nameTicket" className={styles.labelNameTicket}>Tên gói vé <span>*</span></label>
          </div>
          {status === 1 ? 
            <select className={styles.select} onChange={e => setOptionsStatus(e.target.value)}>
              <option selected value='1' >Đang áp dụng</option>
              <option value='2'>Tắt</option>
            </select> : 
            <select className={styles.select} onChange={e => setOptionsStatus(e.target.value)}>
              <option value='1' >Đang áp dụng</option>
              <option selected value='2'>Tắt</option>
            </select>
          }
        </div>
        <div className={styles.titleBox}>
          <span>*</span>
          <p>Đây là trường bắt buộc</p>
        </div>
        <div className={styles.btn}>
            <button onClick={handleBack} className={styles.btnCancel}>Hủy</button>
            <button 
              className={styles.btnSave}
              onClick={() => 
                handleUpdate(currentId, codeTicket, applicableUpdate, expirationUpdate, priceTicketUpdate, optionStatus)}
              >
                Lưu
            </button>
        </div>
        {visibleCalendarLeft && <CalendarCustom className={styles.calendarLeft} onSelectDate={setSelectDateLeft}/>}
        {visibleCalendarRight && <CalendarCustom className={styles.calendarRight} onSelectDate={setSelectDateRight}/>}
    </div>
  )
}
