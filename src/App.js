import React, { Component } from 'react'
import {Cards, Chart, CountryPicker} from './components'
import { fetchData } from './api/index'
import styles from './App.module.css'
import coronaImage from './images/image.png'

// main component
class App extends Component {
    // set state to data and country both have values of empty object and string
    state = {
        data: {},
        country:'',
    }
    // fetch the data using the fetch data function that is imported from index.js and set the state to the fetched data
    async componentDidMount(){
        const data = await fetchData()
        this.setState({data: data})
    }
    // call fetchData with the country as a parameter to fetch the data about that specific country and set the state to that data
    handleCountryChange = async (country) => {
        const data = await fetchData(country)
        this.setState({data: data, country: country})
    }
    render(){
        const {data, country} = this.state;
        // render the components to html
        return (
            <div className={styles.container}>
                <img src={coronaImage} className= {styles.image} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
};

export default App;