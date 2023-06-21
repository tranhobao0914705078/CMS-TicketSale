import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import styles from './Chart.module.css'
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc } from 'firebase/firestore';
import { db, app } from '../../firebase-config/firebase';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)
interface TicketData {
  id: string;
  name_ticket: string;
  status: number;
}

const DonutChart2: React.FC = () => {
  const [data, setData] = useState<TicketData []>([]);
  const [usedCount, setUsedCount] = useState(0);
  const [unusedCount, setUnusedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'ListTicket'), where('name_ticket', '==', 'Gói sự kiện'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name_ticket: doc.data().name_ticket,
        status: doc.data().status,
        ...doc.data()
      }));
      setData(data);
    }
    fetchData()
  }, []) 

  useEffect(() => {
    const used = data.filter((item) => item.status === 1).length;
    const unUsed = data.filter((item) => item.status === 2).length;
    setUsedCount(used);
    setUnusedCount(unUsed)
  }, [data])
  const getChartData = () => {
    return {
      labels: ['Vé đã sử dụng', 'Vé chưa sử dụng'],
      datasets: [
        {
          data: [usedCount, unusedCount],
          backgroundColor: ['#FF8A48', '#4F75FF'],
        },
      ],
    };
  };
  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 20,
            weight: 'bold',
          },
          color: 'black',
        },
      },
    },
  };

  return <div className={styles.donutChart2}><Doughnut data={getChartData()} options={options}/></div>;
};

export default DonutChart2;
