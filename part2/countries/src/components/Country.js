import React from 'react';
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h1>languages</h1>
            <div>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
            </div>
            <img src={country.flag} style={{ height: '100px' }}></img>
            <Weather country={country} />
        </div>
    );
};

export default Country;