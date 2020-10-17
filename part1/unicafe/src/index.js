import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ data }) => {
  console.log(data)
  if (data.total === 0) {
    return <div>No feedback</div>
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={data.good} />
          <Statistic text="neutral" value={data.neutral} />
          <Statistic text="bad" value={data.bad} />
          <Statistic text="all" value={data.total} />
          <Statistic text="average" value={data.average} />
          <Statistic text="positive" value={data.positive} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const avg = () => {
    const result = (good - bad) / total
    return Number.isNaN(result) ? 0 : result
  }
  const positive = () => {
    const result = good * 100 / total + " %"
    console.log("result", result)
    return Number.isNaN(result) ? 0 : result
  }

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: avg(),
    positive: positive()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={() => setGood(good + 1)} />
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" onClick={() => setBad(bad + 1)} />
      </div>

      <h1>statistics</h1>
      <Statistics data={statistics} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)