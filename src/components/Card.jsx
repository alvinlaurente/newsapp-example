
const Card = ({ children, styleClass }) => {
  return (
    <>
      <div className={`${styleClass ?? ''}`}>
        { children }
      </div>
    </>
  )
}

export default Card