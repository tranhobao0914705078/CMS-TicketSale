import React from 'react'
import styles from './Statistical.module.css'
import DonutChart from '../../component/Chart/DonutChart'
import DonutChart2 from '../../component/Chart/DonutChart2'
import LineChart from '../../component/Chart/LineChart'
import iconCalendar from '../image/calendar.svg'

export const Statistical: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <p>Thống kê</p>
      </div>
      <div className={styles.lineChart}>
        <div className={styles.titleChart}>
          <p className={styles.revenue}>Doanh thu</p>
          <div className={styles.date}>
            <p>Tháng 4, 2023</p>
            <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
          </div>
        </div>
        <div className={styles.customLineChart}>
          <LineChart />
        </div>
      </div>
      <div className={styles.revenueOfWeek}>
        <div>
          <p>Tổng doanh thu theo tuần</p>
        </div>
        <div className={styles.moneyBox}>
          <p className={styles.money}>525.145.000</p> <span>đồng</span>
        </div>
      </div>
      <div className={styles.donutChart}>
          <div className={styles.donutChart_date}>
            <p>Tháng 4, 2023</p>
            <img src={iconCalendar} alt="" className={styles.iconCalendar}/>
          </div>
          <div className={styles.boxDonutChart}>
            <div>
              <p className={styles.package}>Gói gia đình</p>
            </div>
            <div className={styles.boxDataLeft}>
              <p>56024</p>
            </div>
            <div className={styles.customDonutChart1}>
              <DonutChart />
            </div>
            <div className={styles.boxDataRight}>
              <p>13568</p>
            </div>
            <div>
              <p className={styles.package}>Gói sự kiện</p>
            </div>
            <div className={styles.boxDataLeft2}>
              <p>30256</p>
            </div>
            <div className={styles.customDonutChart2}>
              <DonutChart2 />
            </div>
            <div className={styles.boxDataRight2}>
              <p>28302</p>
            </div>
          </div>
      </div>
    </div>
  )
}
