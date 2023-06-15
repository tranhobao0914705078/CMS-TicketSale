import React, {useState, useEffect, useReducer} from 'react'
import styles from'./ListTicket.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'
import iconEllipsis from './icon/ellip.svg'
import Pagination from '../../../component/Paginate/paginate'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'
import { OutDate } from '../../../component/Status/OutDate'
import { ChangeTicket } from '../../../component/ChangeTicket/formChangeTicket'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { db, app } from '../../../firebase-config/firebase';
import { reducerTicket, State } from '../../../store/TicketReducer'


interface TicketData{
  id: string;
}

export const ListTicket = () => {

  const [count, setCount] = useState(0);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [isVisibleChange, setIsVisibleChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 20;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const [data, setData] = useState<TicketData[]>([]);
  const [state, dispatch] = useReducer( reducerTicket, {data: []} as State);
  const [filterInput, setFilterInput] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Ticket"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({type: "GET_DATA", payload: data});
      setData(data);
    }
    fetchData();
  }, []);
  
  const handleFilter = () => {
    setCount(count + 1);
    if(count === 0){
      setIsVisibleFilter(true)
    }else if(count === 1){
      setIsVisibleFilter(false)
      setCount(0)
    }
  }
  
  const handleChange = () => {
    setCount(count + 1);
    if(count === 0){
      setIsVisibleChange(true)
    }else if(count === 1){
      setIsVisibleChange(false)
      setCount(0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <h2 className={styles.title}>Danh sách vé</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.Search}>
          <input type="text" value={filterInput} onChange={e => setFilterInput(e.target.value)} placeholder='Tìm bằng số vé'/>
          <button className={styles.search_btn}>
            <img src={iconSearch} alt="" />
          </button>
        </div>
        <div className={styles.btn}>
          <div className={styles.btnFilter}>
            <img src={iconFilter} alt="" />
            <button className={styles.filterTicket} onClick={handleFilter}>Lọc vé</button>
          </div>
          <div className={styles.btnFilter}>
            <button className={styles.filterTicket}>Xuất file (.csv)</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Booking code</th>
            <th>Số vé</th>
            <th>Tên sự kiện</th>
            <th>Tình trạng sử dụng</th>
            <th>Ngày sử dụng</th>
            <th>Ngày xuất vé</th>
            <th>Cổng check-in</th>
          </tr>
        </thead>
        <tbody>
        {state.data
            .sort((a, b) => a.stt - b.stt)
            .filter(item => item.booking_code.includes(filterInput))
            .map((item, index) => 
              <tr>
                <td>{item.stt}</td>
                <td>{item.booking_code}</td>
                <td>{item.code_ticket}</td>
                <td style={{width: '200px'}}>{item.name_event}</td>
                <td>
                  <div
                    className={item.status === 1 ? styles.status : item.status === 2 ? styles.boxStatusUnUsed : styles.boxStatusOutDate}
                  >
                    <>{item.status === 1 ? <Used /> : item.status === 2 ? <UnUsed /> : <OutDate />}</>
                    <p className={styles.status_title}>
                      {item.status === 1 ? "Đã sử dụng" : item.status === 2 ? "Chưa sử dụng" : "Hết hạn"}
                    </p>
                  </div>
                </td>
                <td>{item.applicable_date !== '' ? item.applicable_date : null}</td>
                <td>{item.ticketing_date !== '' ? item.ticketing_date : null}</td>
                <td>
                  {item.gate_checkin === 1 ? "Cổng 1" : 
                    item.status === 2 ? 
                      <div className={styles.statusUnUsed}>
                        <p>-</p>
                        <button className={styles.iconEllipsis} onClick={handleChange}><img src={iconEllipsis} alt="" /></button>
                      </div> : '-'
                  }
                </td>
              </tr> 
            )
        }
        </tbody>
      </table>
      {/* <CalendarCustom /> */}
      <div className={styles.paginate}>
        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange}/>
      </div>
      {/* Filter */}
      {isVisibleFilter && 
          <div className={styles.filter_box}>
          <div>
            <p className={styles.header_title}>Lọc vé</p>
          </div>
          <div className={styles.date}>
            <div className={styles.fromDate}>
              <p className={styles.from}>Từ ngày</p>
              <input type="date" />
            </div>
            <div className={styles.toDate}>
              <p className={styles.to}>Đến ngày ngày</p>
              <input type="date" />
            </div>
          </div>
          <div className={styles.radio_box}>
            <div>
              <p className={styles.radio_box_title}>Tình trạng sử dụng</p>
            </div>
            <div className={styles.radio_box_check}>
              <div className={styles.customRadio}>
                <input type="radio" className={styles.formatRadio} name="status" checked/>
                <p className={styles.titileRadio}>Tất cả</p>
              </div>
              <div className={styles.customRadio}>
                <input type="radio" className={styles.formatRadio} name="status"/>
                <p className={styles.titileRadio}>Đã sử dụng</p>
              </div>
              <div className={styles.customRadio}>
                <input type="radio" className={styles.formatRadio} name="status"/>
                <p className={styles.titileRadio}>Chưa sử dụng</p>
              </div>
              <div className={styles.customRadio}>
                <input type="radio" className={styles.formatRadio} name="status"/>
                <p className={styles.titileRadio}>Hết hạn</p>
              </div>
            </div>
          </div>
          <div className={styles.box_checkIn}>
            <div>
              <p className={styles.radio_box_title}>Cổng Check-in</p>
            </div>
            <div className={styles.box_checked}>
              <div className={styles.customChecked}>
                <input type="checkbox" className={styles.formatRadio} name="status" checked/>
                <p className={styles.titileCheckBox}>Tất cả</p>
              </div>
              <div className={styles.customChecked}>
                <input type="checkbox" className={styles.formatRadio} name="status"/>
                <p className={styles.titileCheckBox}>Cổng 1</p>
              </div>
              <div className={styles.customChecked}>
                <input type="checkbox" className={styles.formatRadio} name="status"/>
                <p className={styles.titileCheckBox}>Cổng 2</p>
              </div>
            </div>
            <div className={styles.box_checked}>
              <div className={styles.customChecked2}>
                <input type="checkbox" className={styles.formatRadio} name="status"/>
                <p className={styles.titileCheckBox}>Cổng 3</p>
              </div>
              <div className={styles.customChecked2}>
                <input type="checkbox" className={styles.formatRadio} name="status"/>
                <p className={styles.titileCheckBox}>Cổng 4</p>
              </div>
              <div className={styles.customChecked2}>
                <input type="checkbox" className={styles.formatRadio} name="status"/>
                <p className={styles.titileCheckBox}>Cổng 5</p>
              </div>
            </div>
          </div>
          <div>
            <button className={styles.btnFilterSearch}>Lọc</button>
          </div>
      </div>
      }
      {isVisibleChange && <ChangeTicket />}
      
    </div>
  )
}
