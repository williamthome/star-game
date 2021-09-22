import { createContext } from "react";

const TimeoutContext = createContext({
  time: undefined,
  setTime: (newTime) => { }
})

export {
  TimeoutContext
}