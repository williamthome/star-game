import { useState } from 'react'
import { GameState } from '../constants'
import { range, randomSum, sum } from '../utils'

const useGameState = (maxStarsCount, maxGuessCount) => {
  const genStarsCount = (numbers) => randomSum(numbers, 1, maxGuessCount)

  const [availableNumbers, setAvailableNumbers] = useState(range(1, maxStarsCount))
  const [starsCount, setStarsCount] = useState(genStarsCount(availableNumbers))
  const [candidateNumbers, setCandidateNumbers] = useState([])

  const gameState =
    availableNumbers.length === 0
      ? GameState.WON
      : GameState.PLAYING

  const starsCountMatch = (numbers, candidates) => {
    const newNumbers =
      numbers.filter(n => !candidates.includes(n))

    setCandidateNumbers([])
    setAvailableNumbers(newNumbers)
    setStarsCount(genStarsCount(newNumbers))
  }

  const setGameState = (newCandidates) =>
    sum(newCandidates) === starsCount
      ? starsCountMatch(availableNumbers, newCandidates)
      : setCandidateNumbers(newCandidates)

  return {
    availableNumbers,
    starsCount,
    candidateNumbers,
    gameState,
    setGameState
  }
}

export {
  useGameState
}
