import React, {useState, useEffect} from 'react'
import { fetchDailyData } from '../../api'
import {Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'
import { DialogTitle } from '@material-ui/core'

// Chart component takes the fetched data as props 
const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([])
    // use effect will call fetchDailyData to fetch the data from api and put the results into a lineChart, bar Chart variables
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPI()
    }, [])

    const lineChart = (
        dailyData.length ? (<Line
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true
            },
             {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                bakgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,

             }], 
        }}
     />
     ): null
    )

    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label:'people',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options= {{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`}
            }}
             />
        ) : null
    )
    // return either line chart or bar chart in the component depends on if there is a country in the search or no 
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}

        </div>
    )
}

export default Chart