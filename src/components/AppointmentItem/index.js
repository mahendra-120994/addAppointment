import './index.css'

const AppointmentItem = props => {
  const {appointDetails, toggleIsStarred} = props
  const {title, id, isStarred, fullDate} = appointDetails

  const starBtn =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const starredBtn =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const imgUrl = isStarred ? starredBtn : starBtn

  const onStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list">
      <div className="list_item">
        <div className="title_container">
          <p className="title">{title}</p>
          <button
            data-testid="star"
            type="button"
            className="star"
            onClick={onStar}
          >
            <img className="star_img" src={imgUrl} alt="star" />
          </button>
        </div>
        <p className="date">Date: {fullDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
