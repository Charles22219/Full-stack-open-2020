import React from 'react';

const Total = ({ course }) => {
    const sum = course.parts.reduce( (sum, part) => sum + part.exercises, 0 )
    return(
      <h3>Number of exercises {sum}</h3>
    ) 
  }

export default Total;