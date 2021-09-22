import { GameState } from '../constants'

export const PlayAgain = ({ gameState }) => {
  return <div>
    <span style={{ marginRight: "0.5rem" }} >
      {gameState === GameState.WON ? "Won" : "Lose"}
    </span>
    <button>Play again</button>
  </div>
}

