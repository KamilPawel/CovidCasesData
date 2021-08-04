import React from 'react'
import GetData from './GetData'
import './Covid.css'
import Plotter from "./Plotter"

const API_LINK = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
)


const testData = {
    x: [1,2,3,4,5,6,7],
    y: [1,2,3,4,5,6,7]
}



const MainApp = () => {
    return (
        <div>
            <h1>Covid Data Visualisation</h1>
            <Plotter data = {testData}/>
            <GetData apiLink = {API_LINK}/>
        </div>
    )
}


export default MainApp
