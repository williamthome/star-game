export const NumberButton = (props) => {
  const { number, status, onClick } = props
  const { color, backgroundColor } = status

  return <button
    style={{ color, backgroundColor }}
    onClick={onClick(number, status)}
  >
    {number}
  </button>
}
