import { useState } from 'react';
import './App.css';

const utils = {
  range: (min, max) => Array.from(
    { length: max },
    (_, i) => i + min
  ),
  randomInt: (min, max) => Math.floor((Math.random() * max) + min),
  randomArrayItem: (arr) => arr[arr.length * Math.random() | 0],
  sum: (arr) => arr.reduce((total, current) => total + current, 0)
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

  const [starsCount, setStarsCount] = useState(utils.randomInt(1, maxStarsCount))
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, maxStarsCount))
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
      setStarsCount(utils.randomArrayItem(newAvailableNumbers))
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
