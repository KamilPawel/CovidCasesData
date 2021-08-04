import React from 'react'
import { Line } from 'react-chartjs-2'



const Plotter = (props) => {
    const data = {
      labels: props.inputData.map(element => element.date),
      datasets: [
        {
          label: 'Number of New COVID Cases',
          data: props.inputData.map(element => element.newCases),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    
    return (
            <div className = 'plot'>
                <Line data={data} options={options} />
            </div>
    )
};
/*

const Plotter = (props) => {
    
    console.log('elol')
    console.log(props.data.x)

    //{props.data.x.map((number, idx)=> <h6>x:{number} y:{props.data.y[idx]}</h6>)}


    return (
        <div>
            <h2>Plotting</h2>
            <Bar
              data = {{
                  labels: ["red", "blue", "pink"],//props.data.labels,
              }}
              height = {400}
              width = {600}
              options = {{
                  maintainAspectRation: false
              }}
            />
        </div>
    )
}*/

export default Plotter
