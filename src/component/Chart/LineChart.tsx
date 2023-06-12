import React from 'react';
import styles from'./Chart.module.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)
    
const LineChart: React.FC = () => {
  const data = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
    datasets: [
      {
        data: [140, 180, 220, 260],
        background: 'linear-gradient(180deg, rgba(250, 160, 95, 0.26) 0%, rgba(255, 255, 255, 0) 141.68%)',
        label: 'doanh thu',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: 220,
            borderColor: '#f26c6d',
            borderWidth: 2,
            borderDash: [4, 4],
          },
        ],
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 140,
        max: 260,
        ticks: {
          stepSize: 40,
          callback: (value: any) => `${value}tr`,
        },
      },
    },
  };

  return <div className={styles.lineChart}><Line data={data} options={options} /></div>;
};

export default LineChart;
