import React, {useState} from 'react'
import styles from './CheckTicket.module.css'
import iconSearch from './icon/search.svg'
import iconCalendar from './icon/calendar.svg'
import iconCalendarActive from './icon/calendarActive.svg'
import Pagination from '../../../component/Paginate/paginate'
import { OutDate } from '../../../component/Status/OutDate'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'


export const CheckTicket = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 20;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }
  return (
    <div className={styles.container}>
      <div className={styles.boxLeft}>
        <div className={styles.headerTitle}>
          <p>Đối soát vé</p>
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
              <button className={styles.filterTicket}>Chốt đối soát</button>
            </div>
            <div className={styles.btnCSV}>
              <button className={styles.filterTicket}>Xuất file (.csv)</button>
            </div>
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
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.unChecked}>Chưa đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.unChecked}>Chưa đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.unChecked}>Chưa đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.unChecked}>Chưa đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.checked}>Đã đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.checked}>Đã đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.checked}>Đã đối soát</td>
          </tr>
          <tr>
            <td>1</td>
            <td>205314876321</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={styles.checked}>Đã đối soát</td>
          </tr>
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
                  <input type="radio" className={styles.formatRadio} checked name="status"/>
                  <p className={styles.titileRadio}>Tất cả</p>
              </div>
              <div className={styles.customRadio}>
                  <input type="radio" className={styles.formatRadio} name="status"/>
                  <p className={styles.titileRadio}>Đã đối soát</p>
              </div>
              <div className={styles.customRadio}>
                  <input type="radio" className={styles.formatRadio} name="status"/>
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
        <button className={styles.Filter}>Lọc</button>
      </div>
    </div>
  )
}
