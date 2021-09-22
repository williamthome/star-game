import { useState } from 'react'
import { GameState } from '../constants'
import { range, randomSum, sum } from '../utils'

const useGameState = ({ maxStarsCount, maxGuessCount, timeout }) => {
  const genStarsCount = (numbers) => randomSum(numbers, 1, maxGuessCount)

  const [availableNumbers, setAvailableNumbers] = useState(range(1, maxStarsCount))
  const [starsCount, setStarsCount] = useState(genStarsCount(availableNumbers))
  const [candidateNumbers, setCandidateNumbers] = useState([])
  const [gameState, setGameState] = useState(GameState.PLAYING)
  const [time, setTime] = useState(timeout)

  const starsCountMatch = (numbers, candidates) => {
    const newNumbers =
      numbers.filter(n => !candidates.includes(n))

    setCandidateNumbers([])
    setAvailableNumbers(newNumbers)
    setStarsCount(genStarsCount(newNumbers))
    newNumbers.length === 0 && setGameState(GameState.WON)
    newNumbers.length > 0 && setTime(timeout)
  }

  const setNewCandidates = (newCandidates) =>
    sum(newCandidates) === starsCount
      ? starsCountMatch(availableNumbers, newCandidates)
      : setCandidateNumbers(newCandidates)

  const setTimeout = () => {
    setGameState(GameState.LOSE)
  }

  return {
    availableNumbers,
    starsCount,
    candidateNumbers,
    gameState,
    setNewCandidates,
    time,
    setTime,
    setTimeout
  }
}

export {
  useGameState
}
