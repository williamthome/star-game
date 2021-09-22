import { useContext } from "react"
import { TimeoutContext } from '../global'
import { useInterval } from "../hooks"

export const Timer = ({ isRunning, onTimeout }) => {
  const { time, setTime } = useContext(TimeoutContext)

  useInterval(() => {
    const newTime = time - 1

    setTime(newTime)
    newTime === 0 && onTimeout()
  }, 1000, isRunning)

  return <pre className="timer">Timeout: {time}</pre>
}
