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

const DonutChart: React.FC = () => {

  const [data, setData] = useState<TicketData []>([]);
  const [usedCount, setUsedCount] = useState(0);
  const [unusedCount, setUnusedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'ListTicket'), where('name_ticket', '==', 'Gói gia đình'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          name_ticket: doc.data().name_ticket,
          status: doc.data().status,
          ...doc.data(),
        }));
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const usedCount = data.filter((item) => item.status === 1).length;
    const unusedCount = data.filter((item) => item.status === 2).length;
    setUsedCount(usedCount);
    setUnusedCount(unusedCount);
  }, [data]);

  const getChartData = () => {
    return {
      labels: [],
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

  return <div className={styles.donutChart}><Doughnut data={getChartData()} options={options}/></div>;
};

export default DonutChart;
