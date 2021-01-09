import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// fetch the api using a try and catch block
export const fetchData = async (country) => {
    let changeable = url
    // check if parameter is passed in
    if (country){
        changeable = `${url}/countries/${country}`
    }
    try {
        // fetch for api and destructure the needed values
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeable)
        return {confirmed, recovered, deaths, lastUpdate}    
    }
    catch (error) {console.log(error)}
}

// get the daily data from the api
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        const modData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modData
    }
    catch(error) {
        console.log(error)
    }
}


export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        return countries.map(country => country.name)
    }
    catch(error){console.log(error)}

}