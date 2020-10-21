import React from 'react';
import Country from './Country'

const Countries = ({ countries, filter, handleShowClick }) => {
    let searchResult = countries.filter((country => country.name.toLowerCase().includes(filter.toLowerCase())))

    if (searchResult.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (searchResult.length === 1){
        return (
            <Country country={searchResult[0]} />
        )
    }
    return (
        searchResult
            .map(country =>
                <div key={country.name}>
                    {country.name}
                    <button onClick={()=>handleShowClick(country.name)}>show</button>
                </div>
            )
    );


};

export default Countries;