import { Bar } from "react-chartjs-2";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register( 
  CategoryScale, 
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type props = {
    datas: any[]
    labels: string[]
}

function BarChart({datas, labels}: props) {
    let barThickness = 60;
  if (window.innerWidth <= 768) {
    barThickness = 20; // set bar thickness to 10 pixels for mobile devices
  }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Monthly Revenue',
          },
        },
      };
      
      
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: datas,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            barThickness: barThickness,
            
          },
        ],
      };
  return (
    <Bar options={options} data={data}  />
  )
}

export default BarChart