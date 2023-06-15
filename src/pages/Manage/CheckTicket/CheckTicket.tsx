import React, {useState, useReducer, useEffect} from 'react'
import styles from './CheckTicket.module.css'
import iconSearch from './icon/search.svg'
import iconCalendar from './icon/calendar.svg'
import iconCalendarActive from './icon/calendarActive.svg'
import Pagination from '../../../component/Paginate/paginate'
import { useNavigate } from 'react-router-dom'
import { db, app } from '../../../firebase-config/firebase';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { reducerManageTicket, State } from '../../../store/ManageTicket'
import { CSVLink } from 'react-csv';
import { headersTicketCSV } from '../../../store/HeaderCSV/HeaderCSVTicket'

interface TicketData {
  id: string;
  stt: string;
  code_ticket: string;
  applicable_date: string;
  name_ticket: string;
  gate_checkin: number;
  status: number;
}

export const CheckTicket = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 20;

  const [data, setData] = useState<{ id: string}[]>([]);
  const [state, dispatch] = useReducer(reducerManageTicket, {data: []} as State);
  const [searchResults, setSearchResults] = useState<TicketData[]>([]);
  const [statusFilter, setStatusFilter] = useState("0");
  const [filterInput, setFilterInput] = useState("");
  const [visibleCheckTicket, setVisibleCheckTicket] = useState(false);
  const [visibleCSV, setVisibleCSV] = useState(false);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      const querySnapshot = await getDocs(collection(db, "ManageTicket"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch ({ type: "GET_DATA", payload: data });
      setData(data);
    }
    fetchData();
  }, [])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const handleFilter = () => {
    const filteredData:any = state.data
      .sort((a, b) => a.stt - b.stt)
      .filter(item => {
        if (statusFilter === "0"){
          setVisibleCSV(false);
          setVisibleCheckTicket(false);
          return true
        }else if(statusFilter === "1"){
          setVisibleCheckTicket(false);
          setVisibleCSV(true);
          return item.status === 1;
        } else if(statusFilter === "2"){
          setVisibleCSV(false);
          setVisibleCheckTicket(true);
          return item.status !== 1;
        }
        return item.status === parseInt(statusFilter); 
      })
      .filter(item => item.code_ticket.includes(filterInput));
    setSearchResults(filteredData); 
  };

  const handleUpdateStatus = async () => {
    const updatedData = state.data.map((item) => {
      if (item.status === 1) {
        return {
          ...item,
          status: 1
        };
      }
      return item;
    });

    dispatch({ type: "UPDATE_DATA", payload: updatedData });
  
    const db = getFirestore(app);
    const colRef = collection(db, "ManageTicket");
    
  
    updatedData.forEach(async (item) => {
      if (item.status !== 1) {
        const docRef = doc(colRef, item.id);
        console.log(item.id)
        await updateDoc(docRef, { status: 1 })
        window.location.reload();
      }
    });
    const updatedSearchResults = searchResults.filter((item) => item.status === 1);
    setSearchResults(updatedSearchResults);
    alert("Success")
  };
  
  

  const handleCSV = () => {
    const filterData = state.data.filter(item => item.status === 1);
    
    const csvData = filterData.map(item => ({
      stt: item.stt,
      code_ticket: item.code_ticket,
      applicable_date: item.applicable_date,
      name_ticket: item.name_ticket,
      gate_checkin: item.gate_checkin === 1 ? "Cổng 1" : "Cổng 2",
      status: "Đã đối soát"
    }));

    const csvHeaders = { headers: headersTicketCSV}

    return(
      <CSVLink data={csvData} {...csvHeaders}>
        <p>Xuất file (.csv)</p>
      </CSVLink>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.boxLeft}>
        <div className={styles.headerTitle}>
          <p>Đối soát vé</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.Search}>
            <input type="text" placeholder='Tìm bằng số vé' onChange={e => setFilterInput(e.target.value)}/>
            <button className={styles.search_btn}>
              <img src={iconSearch} alt="" />
            </button>
          </div>
          <div className={styles.btn}>
            {visibleCheckTicket && 
              <div className={styles.btnFilter}>
                <button className={styles.filterTicket} onClick={handleUpdateStatus}>Chốt đối soát</button>
              </div>
            }
            {
              visibleCSV && 
              <div className={styles.btnCSV}>
                <button className={styles.filterTicket}>
                  {handleCSV()}
                </button>
              </div>
            }
          </div>
        </div>
        <table className={styles.customTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Số vé</th>
            <th>Ngày sử dụng</th>
            <th>Tên loại vé</th>
            <th>Cổng check-in</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? 
            searchResults.map((item, index) => 
            <tr key={index}>
              <td>{item.stt}</td>
              <td>{item.code_ticket}</td>
              <td>{item.applicable_date}</td>
              <td>{item.name_ticket}</td>
              <td>
                {item.gate_checkin === 1 ? "Cổng 1" : "Cổng 2"}
              </td>
              <td 
                className={item.status === 1 ? styles.checked : styles.unChecked}
              >
                {item.status === 1 ? "Đã đối soát" : "Chưa đối soát"}
              </td>
            </tr>   
          ) : 
          state.data
            .sort((a, b) => a.stt - b.stt)
            .filter(item => item.code_ticket.includes(filterInput))
            .map((item, index) =>
              <tr key={index}>
                <td>{item.stt}</td>
                <td>{item.code_ticket}</td>
                <td>{item.applicable_date}</td>
                <td>{item.name_ticket}</td>
                <td>
                    {item.gate_checkin === 1 ? "Cổng 1" : "Cổng 2"}
                </td>
                <td 
                  className={item.status === 1 ? styles.checked : styles.unChecked}
                >
                    {item.status === 1 ? "Đã đối soát" : "Chưa đối soát"}
                </td>
              </tr> 
            )
        }
        </tbody>
        </table>
        <div className={styles.paginate}>
          <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange}/>
        </div>
      </div>
      <div className={styles.boxRight}>
        <div className={styles.headerTitleLeft}>
          <p>Lọc vé</p>
        </div>
        <div className={styles.actionsLeft}>
            <p className={styles.statusCheck}>Tình trạng đối soát</p>
            <div>
              <div className={styles.customRadio}>
                  <input 
                    type="radio" value="0"  
                    checked={statusFilter === "0"}
                    onChange={() => setStatusFilter("0")} 
                    className={styles.formatRadio} 
                    name="status"
                  />
                  <p className={styles.titileRadio}>Tất cả</p>
              </div>
              <div className={styles.customRadio}>
                  <input 
                    type="radio" 
                    className={styles.formatRadio} 
                    name="status" checked={statusFilter === "1"}
                    onChange={() => setStatusFilter("1")}/>
                  <p className={styles.titileRadio}>Đã đối soát</p>
              </div>
              <div className={styles.customRadio}>
                  <input 
                    type="radio" 
                    className={styles.formatRadio} 
                    name="status" 
                    checked={statusFilter === "2"}
                    onChange={() => setStatusFilter("2")}/>
                  <p className={styles.titileRadio}>Chưa đối soát</p>
              </div>
            </div>
        </div>
        <div className={styles.actionsTicket}>
          <p className={styles.statusCheck}>Loại vé</p>
          <p>Vé cổng</p>
        </div>
        <div className={styles.actionsDate}>
          <p className={styles.statusCheck}>Từ ngày</p>
          <div className={styles.actionsLeft_Date}>
              <p>01/05/2023</p>
              <img src={iconCalendar} alt="" />
          </div>
        </div>
        <div className={styles.actionsDate}>
          <p className={styles.statusCheck}>Đến ngày</p>
          <div className={styles.actionsLeft_Date}>
              <p>dd/mm/yy</p>
              <img src={iconCalendarActive} alt="" />
          </div>
        </div>
        <button onClick={handleFilter} className={styles.Filter}>Lọc</button>
      </div>
    </div>
  )
}
