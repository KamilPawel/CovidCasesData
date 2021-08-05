import React, { Component } from 'react'
import axios from 'axios'
import Plotter from './Plotter';
import Test from './Test'

const API_LINK = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate","rateCases":"cumCasesBySpecimenDateRate","cumCases":"cumCasesBySpecimenDate"}'
);

const getData = async ( url ) => {

    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

    if ( status >= 400 )
        throw new Error(statusText);

    return data

};


export class GetData extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            covidData: [],
            dates: [],
    }
}

    componentDidMount = () => {
        axios.get(API_LINK).then(res => {
            console.log(res.data.data)
            this.setState({
                covidData: res.data.data,
                rawData: res
            })
        })
    }


    
    //<Plotter inputData = {this.state.covidData}/>
    
    render() {
        window.state = this.state

        const d = {
                labels: this.state.covidData.map(element => element.date).reverse(),
                datasets: [
                    {
                    type: 'line',
                    label: 'Number of New Covid Cases',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'red',
                    borderWidth: 2,
                    fill: false,
                    data: this.state.covidData.map(element => element.newCases).reverse()
                    },
                    {
                    type: 'line',
                    label: 'Rate of Covid Cases Increasing',
                    backgroundColor: 'cyan',
                    data: this.state.covidData.map(element => element.rateCases).reverse(),
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 2,
                    },
                    /*{
                    type: 'line',
                    label: 'Dataset 3',
                    backgroundColor: 'rgb(75, 192, 192)',
                    data: [1,2,2],
                    },*/
                ],
            };


        return (
            <div>
                <h4>Plotter</h4>
                <Test x = {d} y = {[1,2,3]}/>
                <h4>Data Collected from the API</h4>
                <table>
                    <tr>
                        <th>Cumulative Cases</th>
                        <th>New Cases</th>
                        <th>Rate Case</th>
                        <th>Date</th>
                    </tr>
                    {
                        // {"date":"date","newCases":"newCasesByPublishDate","rateCases":"cumCasesBySpecimenDateRate","cumCase":"cumCasesBySpecimenDate"}
                        this.state.covidData.map((element, i) => {
                            let j = i <= 0 ? 1 : i
                            return (
                            <tr>
                                <th>{element.cumCases || this.state.covidData[j].cumCases || 0}</th>
                                <th>{element.newCases || 0}</th> 
                                <th>{element.rateCases || this.state.covidData[j].rateCases || 0}</th>
                                <th>{element.date}</th>
                            </tr>
                            )
                    })
                    }   
                </table>
            </div>
        )
    }
}



export default GetData
