import React, { Component } from 'react'
import axios from 'axios'
import Plotter from './Plotter';
import Test from './Test'



const rand = () => Math.round(Math.random() * 20 - 10);


const generateStructure = (dict) => {
    let structure = 'structure={'
    for (let i = 0; i < Object.keys(dict).length; i++) {
        if (i < Object.keys(dict).length - 1) {
            structure += `"${Object.keys(dict)}":`
        }
    }
}


const API_LINK = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","one":"newCasesByPublishDate","two":"newTestsByPublishDate","three":"newDeaths28DaysByPublishDate","four":"hospitalCases"}'
);

const API_LINK2 = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","one":"newPillarOneTestsByPublishDate","two":"newPillarTwoTestsByPublishDate","three":"newPillarThreeTestsByPublishDate","four":"cumTestsByPublishDate"}'
);

const API_LINK3 = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","one":"cumCasesByPublishDate","two":"cumCasesByPublishDateRate","three":"cumDeaths28DaysByPublishDate","four":"cumDeaths28DaysByPublishDateRate"}'
);


export class GetData extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            covidData: [],
            covidData2: [],
            finalMap: [],
            firstTitle: 'New Cases',
            secondTitle: 'New Tests',
            thirdTitle: 'New Deaths',
            fourthTitle: 'Hospital Cases',
            monitorWidth: window.innerWidth,
            monitorError: ""
            
    }
}

    componentDidMount = () => {
        axios.get(API_LINK).then(res => {
            console.log(res.data.data)
            this.setState({
                covidData: res.data.data,
                rawData: res,
                monitorError: window.innerWidth < 500 ? 'WARNING: Your display is too small to view this plot, please use a larger display' : ''
            })
        })

    }

    handleClick1 = () => {
        axios.get(API_LINK).then(res => {
            console.log("Gathering data2")
            this.setState({
                covidData: res.data.data,
                firstTitle: 'New Cases',
                secondTitle: 'New Tests',
                thirdTitle: 'Rate of Cumulative Cases',
                fourthTitle: 'Hospital Cases'
            })
        })
    }

    handleClick2 = () => {
        axios.get(API_LINK2).then(res => {
            console.log("Gathering data2")
            this.setState({
                covidData: res.data.data,
                firstTitle: 'Pillar One Tests',
                secondTitle: 'Pillar Two Tests',
                thirdTitle: 'Pillar Three Tests',
                fourthTitle: 'Cumulative Tests'
            })
        })
    }

    
    handleClick3 = () => {
        axios.get(API_LINK3).then(res => {
            console.log("Gathering data2")
            this.setState({
                covidData: res.data.data,
                firstTitle: 'Cumulative Cases',
                secondTitle: 'Rate of Cumulative Cases',
                thirdTitle: 'Cumulative Deaths',
                fourthTitle: 'Rate of Cumulative Deaths'
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
                    label: this.state.firstTitle,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: `rgb(255, 0, 255)`,
                    borderWidth: 2,
                    fill: false,
                    data: this.state.covidData.map(element => element.one).reverse()
                    },
                    {
                    type: 'line',
                    label: this.state.secondTitle,
                    backgroundColor: `rgb(255, 255, 0)`,
                    data: this.state.covidData.map(element => element.two).reverse(),
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 2,
                    },
                    {
                    type: 'line',
                    label: this.state.thirdTitle,
                    backgroundColor: 'rgb(0, 0, 255)',
                    data: this.state.covidData.map(element => element.three).reverse(),
                    },
                    {
                    type: 'line',
                    label: this.state.fourthTitle,
                    backgroundColor: 'rgb(0, 255, 0)',
                    data: this.state.covidData.map(element => element.four).reverse()
                    }
                ],
            };


        return (
            <div>
                <h4>Plotter</h4>
                <h2 style = {{color : 'red'}}>{this.state.monitorError}</h2>
                <Test x = {d} y = {[1,2,3]}/>
                <h6>Choose a dataset</h6>
                <button onClick ={this.handleClick1}>Dataset 1</button>
                <button onClick ={this.handleClick2}>Dataset 2</button>
                <button onClick ={this.handleClick3}>Dataset 3</button>
                <p className = 'covidTagP'>
                    Dataset 1 looks at the general information about the current COVID 19 statistics.
                    It looks at the new daily cases, daily tests, cases at the hospital as well as deaths
                    caused within 28 days of getting a positive test.
                </p>
                <p className = 'covidTagP'>
                    Dataset 2 looks at the pillar covid tests which have four stages: </p>
                    <ul>
                        <li>Pillar 1: swab testing in Public Health England (PHE) labs and NHS hospitals for those with a clinical need, and health and care workers</li>
                        <li>Pillar 2: swab testing for the wider population, as set out in government guidance</li>
                        <li>Pillar 3: serology testing to show if people have antibodies from having had COVID-19</li>
                        <li>Pillar 4: blood and swab testing for national surveillance supported by PHE, the Office for National Statistics (ONS),
                             and research, academic, and scientific partners to learn more about the prevalence and spread of the virus and for other testing research purposes,
                              such as the accuracy and ease of use of home testing</li>
                    </ul>
                <p className = 'covidTagP'>
                    The dataset 2 only contains the results of the first three pillar results and their cumulation of all these tests as the fourth pillar
                    could not be obtained.
                </p>
                <p className = 'covidTagP'>
                    Dataset 3 looks at the cumulative cases COVID 19 cases, the rate of cumulative cases by publish date per 100k resident population,
                    cumulative deaths within 28 days of positive test and rate of cumulative deaths within 28 days of positive test per 100k resident population
                </p>
                
                <h4>Data Collected from the API</h4>
                <table>
                    <tr>
                        <th>{this.state.firstTitle}</th>
                        <th>{this.state.secondTitle}</th>
                        <th>{this.state.thirdTitle}</th>
                        <th>{this.state.fourthTitle}</th>
                        <th>Date</th>
                    </tr>
                    {
                        // {"date":"date","newCases":"newCasesByPublishDate","rateCases":"cumCasesBySpecimenDateRate","cumCase":"cumCasesBySpecimenDate"}
                        this.state.covidData.map((element, i) => {
                            let j = i <= 0 ? 1 : i
                            return (
                            <tr>
                                <th>{element.one || 0}</th> 
                                <th>{element.two || this.state.covidData[j].two || 0}</th>
                                <th>{element.three || this.state.covidData[j].three || 0}</th>
                                <th>{element.four || this.state.covidData[j].four}</th>
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
