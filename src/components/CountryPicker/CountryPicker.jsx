import React, {useState, useEffect}from 'react'
import { NativeSelect, FormControl } from'@material-ui/core';
import styles from './CountryPicker.module.css'
import { fetchCountries } from '../../api'
// use material UI compnents to make a country picker select tag
const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([])
    // fetch the countries to put them as options in the Native select component 
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI();
    }, [setFetchedCountries]);
    
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker