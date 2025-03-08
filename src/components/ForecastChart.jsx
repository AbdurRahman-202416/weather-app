import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Custom plugin to add a drop shadow for a 3D effect
const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDatasetDraw(chart, args, options) {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = options.shadowColor || 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = options.shadowBlur || 10;
    ctx.shadowOffsetX = options.shadowOffsetX || 4;
    ctx.shadowOffsetY = options.shadowOffsetY || 4;
  },
  afterDatasetDraw(chart, args, options) {
    chart.ctx.restore();
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  shadowPlugin
);

function ForecastChart({ forecast }) {
  if (!forecast || !forecast.list) return null;

  // Filter for roughly one data point per day (every 8th item since forecast is provided in 3-hour increments)
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);
  const labels = dailyForecast.map(item =>
    new Date(item.dt * 1000).toLocaleDateString()
  );
  
  // Get temperatures and set the background color based on temperature value
  const temperatures = dailyForecast.map(item => item.main.temp);
  const backgroundColors = temperatures.map(temp => {
    if (temp < 0) {
      return '#772929'; // Dark red for < 0°C
    } else if (temp > 35) {
      return '#b34d0e'; // Dark orange for > 35°C
    } else {
      return '#0eb312'; // Green for temperatures <= 35°C
    }
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Daily Temperature (°C)',
        data: temperatures,
        backgroundColor: backgroundColors,  
        borderColor: '#ffffff',
        borderWidth: 1,
        barThickness: 30,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize based on container dimensions
    plugins: {
      legend: { 
        position: 'top', 
        labels: {
          color: '#ffffff' // Set legend text color to white
        }
      },
      title: {
        display: true,
        text: '5-Day Forecast Temperature',
        color: '#ffffff' // Set title text color to white
      },
      datalabels: {
        color: '#ffffff', // Set datalabels text color to white
        anchor: 'end',
        align: 'end',
        formatter: value => value + '°C',
        font: {
          weight: 'bold',
          size: 12
        }
      },
      // Options for our custom shadow plugin to simulate a 3D effect
      shadowPlugin: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 8,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: value => value + '°C',
          color: '#ffffff' // Set Y-axis ticks color to white
        }
      },
      x: {
        ticks: {
          color: '#ffffff' // Set X-axis ticks color to white
        }
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <h2 className='text-xl font-semibold mb-2 text-white'>5-Day Forecast</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default ForecastChart;
