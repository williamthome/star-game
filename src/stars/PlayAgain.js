import { GameState } from '../constants'

export const PlayAgain = ({ gameState, onPlayAgainClick }) => {
  return <div className="play-again">
    <span style={{ marginRight: "0.5rem" }} >
      {gameState === GameState.WON ? "Won" : "Lose"}
    </span>
    <button onClick={onPlayAgainClick}>Play again</button>
  </div>
}

