import { useEffect, useRef } from "react"

const useInterval = (callback, delay, isRunning = true) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (isRunning) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, isRunning])
}

export {
  useInterval
}
