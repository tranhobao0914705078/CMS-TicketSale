import React from 'react'
import styles from'./ListTicket.module.css'
import iconSearch from './icon/search.svg'
import iconFilter from './icon/filter.svg'


export const ListTicket = () => {
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
            <button className={styles.filterTicket}>Lọc vé</button>
          </div>
          <div className={styles.btnFilter}>
            <button className={styles.filterTicket}>Xuất file (.csv)</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
