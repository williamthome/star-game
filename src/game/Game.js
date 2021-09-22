import { useGameState } from '../store'
import { StarsDisplay } from '../stars'
import { NumbersDisplay } from '../numbers'
import { Timer } from '../timer'
import { TimeoutContext } from '../global'
import { ButtonsStatuses, GameState } from '../constants'
import { sum } from '../utils'

export const Game = ({ startNewGame }) => {
  const config = {
    maxStarsCount: 9,
    maxGuessCount: 18,
    timeout: 10
  }

  const {
    starsCount,
    availableNumbers,
    candidateNumbers,
    gameState,
    setNewCandidates,
    time,
    setTime,
    setTimeout
  } = useGameState(config)

  const { used, available, candidate, wrong } = ButtonsStatuses

  const handleNumberClick = (number, currentStatus) => () => {
    if (currentStatus === used) return

    const newCandidates = currentStatus === candidate || currentStatus === wrong
      ? candidateNumbers.filter(n => n !== number)
      : [number, ...candidateNumbers]

    setNewCandidates(newCandidates)
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
        <TimeoutContext.Provider value={{ time, setTime }}>
          <Timer
            isRunning={gameState === GameState.PLAYING}
            onTimeout={setTimeout}
          />
        </TimeoutContext.Provider>
      </header>
      <div className="content">
        <StarsDisplay
          gameState={gameState}
          starsCount={starsCount}
          onPlayAgainClick={startNewGame}
        />
        <NumbersDisplay
          count={config.maxStarsCount}
          statusFn={numberStatus}
          onClick={handleNumberClick}
        />
      </div>
    </main>
  )
}