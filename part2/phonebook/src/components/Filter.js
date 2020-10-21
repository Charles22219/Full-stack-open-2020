import React from 'react';

const Filter = ({value, handleFilterChange}) => {
    return (
        <div>
        filter shown with: <input value={value} onChange={handleFilterChange} /><br />
        </div>
    );
};

export default Filter;