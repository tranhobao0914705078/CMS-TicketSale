import React, { useState, useEffect, useReducer } from 'react';
import styles from './styles.module.css'
import iconCalendar from './icon/icon.svg'
import { CalendarCustom } from '../Calendar/CalendarCustom'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { db, app } from '../../firebase-config/firebase';
import { reducerTicket, State } from '../../store/TicketReducer';

interface TicketData {
    id: string
}

export const ChangeTicket = ({ currentID }: { currentID: string}) => {
    const [visible, setVisible] = useState(true);
    const [count, setCount] = useState(0);
    const [visibleCalendar, setVisibleCalendar] = useState(false);

    const [data, setData] = useState<TicketData[]>([]);
    const [state, dispatch] = useReducer(reducerTicket, {data: []} as State);
    const [codeTicket, setCodeTicket] = useState("");
    const [typeTicket, setTypeTicket] = useState("");
    const [nameEvent, setNameEvent] = useState("");
    const [ticketDate, setTicketDate] = useState("");
    // updated
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [prevDate, setPrevDate] = useState<string | null>(null);
    const [ticketDateUpdate, setTicketDateUpdate] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            const itemRef = doc(db, "Ticket", currentID);
            const snapshot = await getDoc(itemRef);
            if(snapshot.exists()){
                const itemData = snapshot.data();
                setCodeTicket(itemData.code_ticket);
                setTypeTicket(itemData.type_ticket);
                setNameEvent(itemData.name_event);
                setTicketDate(itemData.applicable_date);
            }
        }
        fetchData();

    }, [currentID, db])

    if(selectedDate !== prevDate){
        const dateValue = selectedDate !== null ? selectedDate : ticketDate;
        setTicketDateUpdate(dateValue)
        setPrevDate(selectedDate);
    }
    
    const updateData = async( id: string, ticketDate: string) => {
        const dataUpdate = {
            applicable_date: ticketDate,
            status: 1,
            gate_checkin: 1
        }
        const itemRef = doc(db, "Ticket", currentID);
        await updateDoc(itemRef, dataUpdate);
        const update = state.data.map((item) => {
            if(item.id === id){
                return{
                    ...item,
                    applicable_date: ticketDate,
                    status: 1,
                    gate_checkin: 1
                }
            }
            return item;
        });
        dispatch({ type: "UPDATE_DATA", payload: update});
        alert("Success!!!");
        window.location.reload();
    }

    
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
                    <p className={styles.content_value} style={{margin: '0 119px'}}>{codeTicket}</p>
                </div>
                <div className={styles.content_title}>
                    <p>Loại vé</p>
                    <p className={styles.content_value} style={{margin: '0 107px'}}>{typeTicket}</p>
                </div>
                <div className={styles.content_title}>
                    <p>Tên sự kiện</p>
                    <p className={styles.custom}>{nameEvent}</p>
                </div>
                <div className={`${styles.content_title} ${styles.content_pointer}`}>
                    <p>Hạn sử dụng</p>
                    <div className={styles.Calendar} onClick={handleClickCalendar}>
                        <input type="text" value={ selectedDate || ticketDate } placeholder='dd/mm/yyyy'/>
                        <img src={iconCalendar} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={handlClick} className={styles.btn_cancle}>Hủy</button>
                <button 
                    className={styles.btn_save}
                    onClick={() => updateData(currentID, ticketDateUpdate)}
                >
                    Lưu
                </button>
            </div>
        </div>
        }
        {visibleCalendar && <div className={styles.calendarCustom}><CalendarCustom className='' onSelectDate={setSelectedDate}/></div>}
    </div>
  )
}
