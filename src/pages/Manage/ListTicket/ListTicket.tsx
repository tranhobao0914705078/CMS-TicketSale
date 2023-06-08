import React, {useState} from 'react'
import styles from'./ListTicket.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'
import { Used } from '../../../component/Status/Used'
import { UnUsed } from '../../../component/Status/UnUsed'
import { OutDate } from '../../../component/Status/OutDate'


export const ListTicket = () => {

  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleFilter = () => {
    setCount(count + 1);
    if(count === 0){
      setIsVisible(true)
    }else if(count === 1){
      setIsVisible(false)
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
          <input type="text" placeholder='Tìm bằng số vé'/>
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
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td style={{width: '200px'}}>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>
              <div className={styles.status}>
                <Used />
                <p className={styles.status_title}>Đã sử dụng</p>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td style={{width: '200px'}}>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>
              <div className={styles.status}>
                  <UnUsed />
                  <p className={styles.status_title_UnUsed}>Chưa sử dụng</p>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td style={{width: '200px'}}>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>
              <div className={styles.status}>
                  <OutDate />
                  <p className={styles.status_title_OutDate}>Hết hạn</p>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td style={{width: '200px'}}>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>
              <div className={styles.status}>
                  <OutDate />
                  <p className={styles.status_title_OutDate}>Hết hạn</p>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>
            <td style={{width: '200px'}}>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>
              <div className={styles.status}>
                  <OutDate />
                  <p className={styles.status_title_OutDate}>Hết hạn</p>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
        </tbody>
      </table>
      {/* Filter */}
      {isVisible && 
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
    </div>
  )
}
