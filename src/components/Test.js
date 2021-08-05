import React from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10);

var labe

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'white',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'line',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'line',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
};

const Test = (props) => (
  <div className = 'plot'>
    <Bar data={props.x} />
  </div>
);

export default Test;