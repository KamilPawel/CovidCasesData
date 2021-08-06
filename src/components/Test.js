import React from 'react';
import { Bar } from 'react-chartjs-2';

const Test = (props) => (
  <div className = 'plot'>
    <Bar data={props.x}/>
  </div>
);

export default Test;