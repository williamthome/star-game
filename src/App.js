import './App.css';
import { useGameState } from './store'
import { StarsDisplay } from './stars'
import { NumbersDisplay } from './numbers'
import { ButtonsStatuses } from './constants'
import { sum } from './utils'

function App() {
  const maxStarsCount = 9
  const maxGuessCount = maxStarsCount * 3

  const {
    starsCount,
    availableNumbers,
    candidateNumbers,
    gameState,
    setGameState
  } = useGameState(maxStarsCount, maxGuessCount)

  const { used, available, candidate, wrong } = ButtonsStatuses

  const handleNumberClick = (number, currentStatus) => () => {
    if (currentStatus === used) return

    const newCandidates = currentStatus === candidate || currentStatus === wrong
      ? candidateNumbers.filter(n => n !== number)
      : [number, ...candidateNumbers]

    setGameState(newCandidates)
  }

  const numberStatus = (number) =>
    candidateNumbers.includes(number)
      ? sum(candidateNumbers) <= starsCount
        ? candidate
        : wrong
      : availableNumbers.includes(number)
        ? available
        : used

  return (
    <main>
      <header>
        <pre>Current: {starsCount}</pre>
        <pre>Available: [{availableNumbers.join(", ")}]</pre>
        <pre>Candidates: [{candidateNumbers.join(", ")}]</pre>
        <pre>Candidates sum: {sum(candidateNumbers)}</pre>
      </header>
      <div className="content">
        <StarsDisplay
          gameState={gameState}
          starsCount={starsCount}
        />
        <NumbersDisplay
          count={maxStarsCount}
          statusFn={numberStatus}
          onClick={handleNumberClick}
        />
      </div>
    </main>
  )
}

export default App;
