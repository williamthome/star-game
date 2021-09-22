import { useState } from 'react'
import { GameState } from '../constants'
import * as utils from '../utils'

const useGameState = (maxStarsCount) => {
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, maxStarsCount))
  const [starsCount, setStarsCount] = useState(utils.randomSum(availableNumbers))
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
    setStarsCount(utils.randomSum(newNumbers))
  }

  const setGameState = (newCandidates) =>
    utils.sum(newCandidates) === starsCount
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
