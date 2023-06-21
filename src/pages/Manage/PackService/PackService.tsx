import React, { useState, useEffect, useReducer } from 'react';
import styles from'./PackService.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'
import iconEllipsis from './icon/ellip.svg'
import iconEdit from './icon/edit.svg'
import Pagination from '../../../component/Paginate/paginate'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'
import { OutDate } from '../../../component/Status/OutDate'
import { AddTicket } from '../../../component/AddTicket/FormAddTicket'
import { UpdateTicket } from '../../../component/UpdateTicket/FormUpdateTicket'
import { StatusOff } from '../../../component/Status/StatusOff'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { db, app } from '../../../firebase-config/firebase';
import { reducerTicket, State } from '../../../store/TicketReducer';
import { CSVLink } from 'react-csv';
import { headersServiceCSV } from '../../../store/HeaderCSV/HeaderCSVService';

interface TicketData {
  id: string;
  // code_ticket: string;
}

export const PackService = () => {
  const itemPage = 10;
  const [data, setData] = useState<TicketData[]>([]);
  const [count, setCount] = useState(0);
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(data.length / itemPage);
  const [state, dispatch] = useReducer(reducerTicket, {data: []} as State);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentId, setCurrentId] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "ListTicket"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({type: "GET_DATA", payload: data});
      setData(data);
    }
    fetchData();
  }, [])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }
  const start = (currentPage - 1) * itemPage;
  const end = start + itemPage;
  const currentData = state.data.slice(start, end); 

  const handleAdd = () => {
    setCount(count + 1);
    if(count === 0){
      setIsVisibleAdd(true)
    }else if(count === 1){
      setIsVisibleAdd(false)
      setCount(0)
    }
  }
  const handleUpdate = async(id: string) => {
    setCurrentId(id);
    setCount(count + 1);
    if(count === 0){
      setIsVisibleUpdate(true)
    }else if(count === 1){
      setIsVisibleUpdate(false)
      setCount(0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <h2 className={styles.title}>Danh sách gói vé</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.Search}>
          <input value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)} type="text" placeholder='Tìm bằng số vé'/>
          <button className={styles.search_btn}>
            <img src={iconSearch} alt="" />
          </button>
        </div>
        <div className={styles.btn}>
          <div className={styles.btnFilter}>
            <button className={styles.filterTicket}>
              <CSVLink data={data} headers={headersServiceCSV}>
                <p className={styles.CSV}>Xuất file (.csv)</p>
              </CSVLink>
            </button>
          </div>
          <div className={styles.btnAdd}>
            <button className={styles.addTicket} onClick={handleAdd}>Thêm gói vé</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã gói</th>
            <th>Tên gói vé</th>
            <th>Ngày áp dụng</th>
            <th>Ngày hết hạn</th>
            <th>Giá vé (VNĐ/Vé)</th>
            <th style={{width: '150px'}}>Giá Combo (VNĐ/Combo)</th>
            <th>Tình trạng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData
          .sort((a, b) => a.stt - b.stt)
          .filter(item => item.code_ticket.includes(searchTerm))
          .map((item, index) => 
            <tr key={index}>
              <td>{item.stt}</td>
              <td>{item.code_ticket}</td>
              <td>{item.name_ticket}</td>
              <td>{item.applicable_date.date} <br /><>{item.applicable_date.time}</></td>
              <td>{item.expiration_date.date} <br /><>{item.expiration_date.time}</></td>
              <td>{(+item.price_ticket.single_ticket).toLocaleString()} VNĐ</td>
              <td>
                {item.price_ticket.combo_ticket.price !== '' ? `${(+item.price_ticket.combo_ticket.price).toLocaleString()} VNĐ /${item.price_ticket.combo_ticket.ticket} vé` : null}
              </td>
              <td>
                <div className={item.status === 1 ? styles.status : styles.status_Off}>
                  {item.status === 1 ? <UnUsed /> : <StatusOff />}
                  <p className={item.status === 1 ? styles.status_title_UnUsed : styles.status_title_Off}>
                    {item.status === 1 ? 'Đang sử dụng' : 'Tắt'}
                  </p>
                </div>
              </td>
              <td>
                <div className={styles.actionsEdit}>
                    <img src={iconEdit} alt="" />
                    <p onClick={() => handleUpdate(item.id)}>Cập nhật</p>
                </div>
            </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.paginate}>
        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange}/>
      </div>
      {/* Add */}
      {isVisibleAdd && <AddTicket />}
      {isVisibleUpdate && <UpdateTicket currentId={currentId}/>}
    </div>
  )
}
