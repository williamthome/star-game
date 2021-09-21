import { useState } from 'react';
import './App.css';

const utils = {
  range: (min, max) => Array.from(
    { length: max },
    (_, i) => i + min
  ),
  randomInt: (min, max) => Math.floor((Math.random() * max) + min)
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
  const { number, status } = props
  const { color, backgroundColor } = status

  return <button
    className="button"
    style={{ color, backgroundColor }}
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

const NumberButtons = ({ count, statusFn }) => {
  return <div className="number-buttons">
    {utils
      .range(1, count)
      .map(number =>
        <NumberButton
          key={number}
          number={number}
          status={statusFn(number)}
        />)
    }
  </div>
}

function App() {
  const maxStarsCount = 9
  const rndStarsFn = (max = maxStarsCount) => utils.randomInt(1, max)

  const [starsCount] = useState(rndStarsFn)

  const numberStatus = (_number) => {
    return buttonsStatuses.available
  }

  return (
    <main className="App">
      <Stars count={starsCount} />
      <NumberButtons
        count={maxStarsCount}
        statusFn={numberStatus}
      />
    </main>
  );
}

export default App;
