import { useState } from 'react';
import './App.css';

const utils = {
  range: (min, max) => Array.from(
    { length: max },
    (_, i) => i + min
  ),
  randomInt: (min, max) => Math.floor((Math.random() * max) + min),
  randomArrayItem: (arr) => arr[arr.length * Math.random() | 0],
  sum: (arr) => arr.reduce((total, current) => total + current, 0),
  randomSum: function (arr) {
    if (arr.length === 1) return arr[0]

    const sum = new Set()
    sum.add(this.sum(arr))

    for (const item of arr) {
      sum.add(item)
      const otherItems = arr.filter(i => i !== item)
      sum.add(this.sum(otherItems))
      for (const other of otherItems) {
        sum.add(item + other)
      }
    }

    return this.randomArrayItem(
      Array.from(sum.values())
    )
  }
}

const buttonsStatuses = {
  available: {
    color: "black",
    backgroundColor: "lightgray"
  },
  used: {
    color: "white",
    backgroundColor: "lightgreen"
  },
  wrong: {
    color: "white",
    backgroundColor: "lightcoral"
  },
  candidate: {
    color: "white",
    backgroundColor: "deepskyblue"
  }
}

const Star = () => {
  return <span
    className="star"
  >
    Star
  </span>
}

const NumberButton = (props) => {
  const { number, status, onClick } = props
  const { color, backgroundColor } = status

  return <button
    className="button"
    style={{ color, backgroundColor }}
    onClick={onClick(number, status)}
  >
    {number}
  </button>
}

const Stars = ({ count }) => {
  return <div className="stars">
    {utils
      .range(1, count)
      .map(starId =>
        <Star key={starId} />
      )
    }
  </div>
}

const NumberButtons = ({ count, statusFn, onClick }) => {
  return <div className="number-buttons">
    {utils
      .range(1, count)
      .map(number =>
        <NumberButton
          key={number}
          number={number}
          status={statusFn(number)}
          onClick={onClick}
        />)
    }
  </div>
}

function App() {
  const maxStarsCount = 9

  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, maxStarsCount))
  const [starsCount, setStarsCount] = useState(utils.randomSum(availableNumbers))
  const [candidateNumbers, setCandidateNumbers] = useState([])

  const numberStatus = (number) => {
    const { available, used, candidate, wrong } = buttonsStatuses

    return candidateNumbers.includes(number)
      ? utils.sum(candidateNumbers) <= starsCount
        ? candidate
        : wrong
      : availableNumbers.includes(number)
        ? available
        : used
  }

  const handleNumberClick = (number, status) => () => {
    const { used, candidate, wrong } = buttonsStatuses

    if (status === used) return

    const newCandidates = status === candidate || status === wrong
      ? candidateNumbers.filter(n => n !== number)
      : [number, ...candidateNumbers]

    if (utils.sum(newCandidates) === starsCount) {
      const newAvailableNumbers =
        availableNumbers.filter(n => !newCandidates.includes(n))

      setCandidateNumbers([])
      setAvailableNumbers(newAvailableNumbers)
      setStarsCount(utils.randomSum(newAvailableNumbers))
    } else {
      setCandidateNumbers(newCandidates)
    }
  }

  return (
    <main className="App">
      <div>
        <pre>Current: {starsCount}</pre>
        <pre>Available: [{availableNumbers.join(", ")}]</pre>
        <pre>Candidates: [{candidateNumbers.join(", ")}]</pre>
        <pre>Candidates sum: {utils.sum(candidateNumbers)}</pre>
      </div>
      <Stars count={starsCount} />
      <NumberButtons
        count={maxStarsCount}
        statusFn={numberStatus}
        onClick={handleNumberClick}
      />
    </main>
  );
}

export default App;
