import React, {useState} from 'react'
import styles from'./PackService.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'
import iconEllipsis from './icon/ellip.svg'
import iconEdit from './icon/edit.svg'
import Pagination from '../../../component/Paginate/paginate'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'
import { OutDate } from '../../../component/Status/OutDate'
import { ChangeTicket } from '../../../component/ChangeTicket/formChangeTicket'
import { CalendarCustom } from '../../../component/Calendar/CustomCalendar/CustomCalendar'
import { StatusOff } from '../../../component/Status/StatusOff'

export const PackService = () => {

  const [count, setCount] = useState(0);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [isVisibleChange, setIsVisibleChange] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 20;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }
  
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
        <h2 className={styles.title}>Danh sách gói vé</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.Search}>
          <input type="text" placeholder='Tìm bằng số vé'/>
          <button className={styles.search_btn}>
            <img src={iconSearch} alt="" />
          </button>
        </div>
        <div className={styles.btn}>
          <div className={styles.btnFilter}>
            <button className={styles.filterTicket} onClick={handleFilter}>Xuất file (.csv)</button>
          </div>
          <div className={styles.btnAdd}>
            <button className={styles.addTicket}>Thêm gói vé</button>
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
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>Gói gia đình</td>
            <td>14/04/2021 <br />08:00:00</td>
            <td>14/04/2021 <br />23:00:00</td>
            <td>90.000 VNĐ</td>
            <td>360.000 VNĐ/4 Vé</td>
            <td>
              <div className={styles.status}>
                  <UnUsed />
                  <p className={styles.status_title_UnUsed}>Đang sử dụng</p>
              </div>
            </td>
            <td>
                <div className={styles.actionsEdit}>
                    <img src={iconEdit} alt="" />
                    <p>Cập nhật</p>
                </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>ALT20210501</td>
            <td>Gói gia đình</td>
            <td>14/04/2021 <br />08:00:00</td>
            <td>14/04/2021 <br />23:00:00</td>
            <td>90.000 VNĐ</td>
            <td>360.000 VNĐ/4 Vé</td>
            <td>
              <div className={styles.status_Off}>
                  <StatusOff />
                  <p className={styles.status_title_Off}>Tắt</p>
              </div>
            </td>
            <td>
                <div className={styles.actionsEdit}>
                    <img src={iconEdit} alt="" />
                    <p>Cập nhật</p>
                </div>
            </td>
          </tr>
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
