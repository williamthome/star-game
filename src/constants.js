const GameState = Object.freeze({
  PLAYING: Symbol("playing"),
  WON: Symbol("won"),
  LOSE: Symbol("lose")
})

const ButtonsStatuses = Object.freeze({
  available: {
    color: "black",
    backgroundColor: "lightgray"
  },
  used: {
    color: "white",
    backgroundColor: "lightgreen"
  },
  wrong: {
    color: "white",
    backgroundColor: "lightcoral"
  },
  candidate: {
    color: "white",
    backgroundColor: "deepskyblue"
  }
})

export {
  GameState,
  ButtonsStatuses
}