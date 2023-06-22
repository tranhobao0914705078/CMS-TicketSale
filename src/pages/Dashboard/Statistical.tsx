import React from 'react'
import styles from './Statistical.module.css'
import DonutChart from '../../component/Chart/DonutChart'
import DonutChart2 from '../../component/Chart/DonutChart2'
import LineChart from '../../component/Chart/LineChart'
import iconCalendar from '../image/calendar.svg'
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc } from 'firebase/firestore';
import { db, app } from '../../firebase-config/firebase';
import { Month } from '../../component/DropMonth/Month'

interface TicketData {
  id: string;
  name_ticket: string;
  status: number;
}

export const Statistical: React.FC = () => {

  const [data, setData] = useState<TicketData []>([]);
  const [usedCountFamily, setUsedCountFamily] = useState(0);
  const [unusedCountFamily, setUnusedCountFamily] = useState(0);
  const [usedCountEvent, setUsedCountEvent] = useState(0);
  const [unusedCountEvent, setUnusedCountEvent] = useState(0);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const fetchData = async() => {
      const q = query(collection(db, 'ListTicket'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name_ticket: doc.data().name_ticket,
        status: doc.data().status,
        ...doc.data(),
      }))
      setData(data)
    }
    fetchData();
  })

  const handleClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  useEffect(() => {
    const usedCount = data.filter((item) => item.name_ticket === 'Gói gia đình' ? item.status === 1 : '').length;
    const unUsedCount = data.filter((item) => item.name_ticket === 'Gói gia đình' ? item.status === 2 : '').length;
    const usedCountEvent = data.filter((item) => item.name_ticket === 'Gói sự kiện' ? item.status === 1 : '').length;
    const unUsedCountEvent = data.filter((item) => item.name_ticket === 'Gói sự kiện' ? item.status === 2 : '').length;
    setUsedCountFamily(usedCount);
    setUnusedCountFamily(unUsedCount);
    setUsedCountEvent(usedCountEvent)
    setUnusedCountEvent(unUsedCountEvent)
  }, [data])

  const handleChange = (newValue: number | null) => {
    if(newValue){
      
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <p>Thống kê</p>
      </div>
      <div className={styles.lineChart}>
        <div className={styles.titleChart}>
          <p className={styles.revenue}>Doanh thu</p>
          <div className={styles.donutChart_date}>
            <Month onChange={handleChange} className={styles.customMonth}/>
            {/* <p>Tháng 4, {currentYear}</p>
            <img src={iconCalendar} alt="" className={styles.iconCalendar} /> */}
          </div>
        </div>
        <div className={styles.customLineChart}>
          <LineChart className={styles.customLine}/>
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
            <Month onChange={handleChange} className={styles.customMonth}/>
          </div>
          <div className={styles.boxDonutChart}>
            <div>
              <p className={styles.package}>Gói gia đình</p>
            </div>
            <div className={styles.boxDataLeft}>
              <p>{unusedCountFamily}</p>
            </div>
            <div className={styles.customDonutChart1}>
              <DonutChart />
            </div>
            <div className={styles.boxDataRight}>
              <p>{usedCountFamily}</p>
            </div>
            <div>
              <p className={styles.package}>Gói sự kiện</p>
            </div>
            <div className={styles.boxDataLeft2}>
              <p>{unusedCountEvent}</p>
            </div>
            <div className={styles.customDonutChart2}>
              <DonutChart2 />
            </div>
            <div className={styles.boxDataRight2}>
              <p>{usedCountEvent}</p>
            </div>
          </div>
      </div>
    </div>
  )
}
