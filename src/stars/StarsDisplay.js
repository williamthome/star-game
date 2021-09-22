import { GameState } from '../constants'
import { Star } from './Star'
import { PlayAgain } from './PlayAgain'
import { range } from '../utils'

export const StarsDisplay = ({ gameState, starsCount }) => {
  return <>
    {gameState === GameState.PLAYING
      ? <div className="display">
        {range(1, starsCount)
          .map(starId =>
            <Star key={starId} />
          )
        }
      </div>
      : <PlayAgain gameState={gameState} />}
  </>
}