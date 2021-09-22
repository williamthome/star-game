import { NumberButton } from './NumberButton'
import { range } from '../utils'

export const NumbersDisplay = ({ count, statusFn, onClick }) => {
  return <div>
    {range(1, count)
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
