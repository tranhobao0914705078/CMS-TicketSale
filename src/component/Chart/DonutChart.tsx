import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import styles from './Chart.module.css'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const DonutChart: React.FC = () => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [30, 70], 
        backgroundColor: [' #FF8A48', '#4F75FF'], 
      },
    ],
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

  return <div className={styles.donutChart}><Doughnut data={data} options={options}/></div>;
};

export default DonutChart;
