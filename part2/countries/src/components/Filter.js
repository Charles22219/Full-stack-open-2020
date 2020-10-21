import React from 'react';

const Filter = ({value, handleFilterChange}) => {
    return (
        <div>
        find countries: <input value={value} onChange={handleFilterChange} /><br />
        </div>
    );
};

export default Filter;