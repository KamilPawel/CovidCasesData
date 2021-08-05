import React from 'react'
import { Line } from 'react-chartjs-2'
import { useState } from 'react';


const Plotter = (props) => {
    const data = {
      labels: props.inputData.map(element => element.date).reverse(),
      datasets: [
        {
          label: 'Number of New COVID Cases',
          data: props.inputData.map(element => element.newCases).reverse(),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: "Number of Rate COVID Cases",
            data: props.inputData.map(element => element.rateCases).reverse(),
            fill: false,
            backgroundColor: 'rgb(80, 255, 100)',
            borderColor: 'rgba(80, 255, 100, 0.2)'
        }
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
    const [dataState, setData] = useState(data)

    const handleClick = () => {
        const newData = data
        if (data.datasets[0] === "") {
            console.log("Change this to real value")
            newData.datasets[0].data = props.inputData.map(element => element.newCases).reverse()
        }
        else {
            console.log("Change this to ''")
            newData.datasets[0].data = ""
        }
        setData(newData)
        console.log(newData.datasets)
        console.log('clicked')
        return (
            <div className = 'plot'>
                <Line redraw = {true} data={data} options={options} />
                <button onClick = {handleClick}>Get Data</button>
            </div>            
        )
    }
    window.d = dataState
    return (
            <div className = 'plot'>
                <Line data={data} options={options} />
                <button onClick = {handleClick}>Get Data</button>
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
