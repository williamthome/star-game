export const NumberButton = (props) => {
  const { number, status, onClick } = props
  const { color, backgroundColor } = status

  return <button
    className="number-button"
    style={{ color, backgroundColor }}
    onClick={onClick(number, status)}
  >
    {number}
  </button>
}
