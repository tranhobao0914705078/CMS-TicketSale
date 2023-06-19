import React, {useState, useEffect, useReducer} from 'react'
import styles from'./ListTicket.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'
import iconEllipsis from './icon/ellip.svg'
import iconCalendar from './icon/calendar.svg'
import Pagination from '../../../component/Paginate/paginate'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'
import { OutDate } from '../../../component/Status/OutDate'
import { ChangeTicket } from '../../../component/ChangeTicket/formChangeTicket'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { db, app } from '../../../firebase-config/firebase';
import { reducerTicket, State } from '../../../store/TicketReducer'
import { CalendarCustom } from '../../../component/Calendar/CalendarCustom'
import { headerCSVList } from '../../../store/HeaderCSV/HeaderCSVList'
import { CSVLink } from 'react-csv'

interface TicketData{
  id: string;
  stt: number;
  booking_code: string;
  code_ticket: string;
  gate_checkin: number;
  name_event: string;
  status: number;
  applicable_date: string;
  ticketing_date: string;
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

  const [data, setData] = useState<{id: string}[]>([]);
  const [currentID, setCurrentID] = useState("");
  const [state, dispatch] = useReducer( reducerTicket, {data: []} as State);
  const [filterInput, setFilterInput] = useState("");
  const [visibleCalendarLeft, setVisibleCalendarLeft] = useState(false);
  const [visibleCalendarRight, setVisibleCalendarRight] = useState(false);
  const [selectDateLeft, setSelectDateLeft] = useState<string | null>(null);
  const [selectDateRight, setSelectDateRight] = useState<string | null>(null);
  const [statusFilterRadio, setStatusFilterRadio] = useState("0");
  const [statusFilterCheckbox, setStatusFilterCheckbox] = useState("0");
  const [searchResult, setSearchResults] = useState<TicketData[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
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
  
  const handleChange = (id: string) => {
    setCurrentID(id);
    setCount(count + 1);
    if(count === 0){
      setIsVisibleChange(true)
    }else if(count === 1){
      setIsVisibleChange(false)
      setCount(0)
    }
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

  const handleAllChecked = () =>{
    setIsAllChecked(!isAllChecked);
  }

  const handleSearch = () => {
    const searchData: TicketData[] = state.data
      .sort((a, b) => a.stt - b.stt)
      .filter((item: TicketData) => {
        if (statusFilterCheckbox === "0") {
          return true;
        } else if (statusFilterCheckbox === "1") {
          return item.gate_checkin === 1;
        } else if (statusFilterCheckbox === "2") {
          return item.gate_checkin === 2;
        } else if (statusFilterCheckbox === "3") {
          return item.gate_checkin === 3;
        } else if (statusFilterCheckbox === "4") {
          return item.gate_checkin === 4;
        } else if (statusFilterCheckbox === "5") {
          return item.gate_checkin === 5;
        }
        return item.gate_checkin === parseInt(statusFilterCheckbox);
      })
      .filter((item: TicketData) => {
        if (statusFilterRadio === "0") {
          return true;
        } else if (statusFilterRadio === "1") {
          return item.status === 1;
        } else if (statusFilterRadio === "2") {
          return item.status === 2;
        } else if (statusFilterRadio === "3") {
          return item.status === 3;
        }
        return item.status === parseInt(statusFilterRadio);
      })
      .filter((item: TicketData) => {
        if (selectDateLeft && selectDateRight) {
          const startDate = selectDateLeft;
          const endDate = selectDateRight;
          const applicableDate = item.applicable_date;
          return applicableDate >= startDate && applicableDate <= endDate;
        }
        return true;
      });
    setIsVisibleFilter(false);
    setSelectDateLeft("");
    setSelectDateRight("");
    setSearchResults(searchData);
  };
  
  const handleCSV = () => {
    const csvData = state.data.map((data) => ({
      stt: data.stt,
      booking_code: data.booking_code,
      code_ticket: data.code_ticket,
      name_event: data.name_event,
      applicable_date: data.applicable_date,
      ticketing_date: data.ticketing_date,
      gate_checkin: data.gate_checkin === 1 ? "Cổng 1" : "",
      status: data.status === 1 ? "Đã sử dụng" : data.status === 2 ? "Chưa sử dụng" : "Hết hạn"
    }))

    const csvHeaders = { headers: headerCSVList}

    return(
      <CSVLink data={csvData} {...csvHeaders} className={styles.customCSV}>
        Xuất file (.csv)
      </CSVLink>
    )
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
            <button className={styles.filterTicket}>
              {handleCSV()}
            </button>
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
          {searchResult.length > 0 ? 
            searchResult
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
                      <button className={styles.iconEllipsis} onClick={() => handleChange(item.id)}><img src={iconEllipsis} alt="" /></button>
                    </div> : '-'
                }
              </td>
            </tr> 
            ) : 
            state.data
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
                        <button className={styles.iconEllipsis} onClick={() => handleChange(item.id)}><img src={iconEllipsis} alt="" /></button>
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
              <div className={styles.boxDateLeft} onClick={handleCalendarLeft}>
                <input type="text" value={selectDateLeft || ''} placeholder='dd/mm/yy'/>
                <img src={iconCalendar} alt="" />
              </div>
            </div>
            <div className={styles.toDate}>
              <p className={styles.to}>Đến ngày ngày</p>
              <div className={styles.boxDateRight} onClick={handleCalendarRight}>
                <input type="text" value={selectDateRight || ''} placeholder='dd/mm/yy'/>
                <img src={iconCalendar} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.radio_box}>
            <div>
              <p className={styles.radio_box_title}>Tình trạng sử dụng</p>
            </div>
            <div className={styles.radio_box_check}>
              <div className={styles.customRadio}>
                <input 
                  type="radio" 
                  className={styles.formatRadio} 
                  name="status"
                  checked={statusFilterRadio === "0"}
                  onChange={() => setStatusFilterRadio("0")} 
                />
                <p className={styles.titileRadio}>Tất cả</p>
              </div>
              <div className={styles.customRadio}>
                <input 
                  type="radio" 
                  className={styles.formatRadio} 
                  name="status"
                  checked={statusFilterRadio === "1"}
                  onChange={() => setStatusFilterRadio("1")} 
                />
                <p className={styles.titileRadio}>Đã sử dụng</p>
              </div>
              <div className={styles.customRadio}>
                <input 
                  type="radio" 
                  className={styles.formatRadio} 
                  name="status"
                  checked={statusFilterRadio === "2"}
                  onChange={() => setStatusFilterRadio("2")} 
                />
                <p className={styles.titileRadio}>Chưa sử dụng</p>
              </div>
              <div className={styles.customRadio}>
                <input 
                  type="radio" 
                  className={styles.formatRadio} 
                  name="status"
                  checked={statusFilterRadio === "3"}
                  onChange={() => setStatusFilterRadio("3")} 
                />
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
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  onClick={handleAllChecked} 
                  checked={isAllChecked}
                  onChange={() => setStatusFilterCheckbox("0")}
                />
                <p className={styles.titileCheckBox}>Tất cả</p>
              </div>
              <div className={styles.customChecked}>
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  disabled={isAllChecked}
                  checked={statusFilterCheckbox === "1"}
                  onChange={() => setStatusFilterCheckbox("1")}
                />
                <p className={styles.titileCheckBox}>Cổng 1</p>
              </div>
              <div className={styles.customChecked}>
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  disabled={isAllChecked}
                  checked={statusFilterCheckbox === "2"}
                  onChange={() => setStatusFilterCheckbox("2")}
                />
                <p className={styles.titileCheckBox}>Cổng 2</p>
              </div>
            </div>
            <div className={styles.box_checked}>
              <div className={styles.customChecked2}>
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  disabled={isAllChecked}
                  checked={statusFilterCheckbox === "3"}
                  onChange={() => setStatusFilterCheckbox("3")}
                />
                <p className={styles.titileCheckBox}>Cổng 3</p>
              </div>
              <div className={styles.customChecked2}>
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  disabled={isAllChecked}
                  checked={statusFilterCheckbox === "4"}
                  onChange={() => setStatusFilterCheckbox("4")}
                />
                <p className={styles.titileCheckBox}>Cổng 4</p>
              </div>
              <div className={styles.customChecked2}>
                <input 
                  type="checkbox" 
                  className={styles.formatRadio} 
                  name="status" 
                  disabled={isAllChecked}
                  checked={statusFilterCheckbox === "5"}
                  onChange={() => setStatusFilterCheckbox("5")}
                  />
                <p className={styles.titileCheckBox}>Cổng 5</p>
              </div>
            </div>
          </div>
          <div>
            <button className={styles.btnFilterSearch} onClick={handleSearch}>Lọc</button>
          </div>
      </div>
      }
      {isVisibleChange && <ChangeTicket currentID= {currentID}/>}
      {visibleCalendarLeft && <CalendarCustom className={styles.calendarLeft} onSelectDate={setSelectDateLeft}/>}
      {visibleCalendarRight && <CalendarCustom className={styles.calendarRight} onSelectDate={setSelectDateRight}/>}
    </div>
  )
}
