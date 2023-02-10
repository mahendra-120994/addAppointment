import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

const imgUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isFiltered: false}

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prev => ({
      appointmentList: prev.appointmentList.map(eachAppoint => {
        if (eachAppoint.id === id) {
          return {...eachAppoint, isStarred: !eachAppoint.isStarred}
        }
        return eachAppoint
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        fullDate: format(new Date(date), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      }

      this.setState(prev => ({
        appointmentList: [...prev.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onFilter = () => {
    const {isFiltered} = this.state

    this.setState({isFiltered: !isFiltered})
  }

  getStaredAppoints = () => {
    const {appointmentList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isFiltered} = this.state
    const activeFilterBtn = isFiltered ? 'active_filter' : ''
    const filteredAppointments = this.getStaredAppoints()
    return (
      <div className="bg_container">
        <div className="inner_container">
          <div className="container">
            <div className="create_appoint_container">
              <h1 className="heading">Add Appointment</h1>
              <form className="input_container" onSubmit={this.addAppointment}>
                <label htmlFor="Title" className="label">
                  TITLE
                </label>
                <input
                  id="Title"
                  type="text"
                  placeholder="Title"
                  className="input"
                  onChange={this.addTitle}
                  value={title}
                />
                <label htmlFor="Date" className="label">
                  DATE
                </label>
                <input
                  id="Date"
                  type="date"
                  className="input"
                  onChange={this.addDate}
                  value={date}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="img_container">
              <img className="img" src={imgUrl} alt="appointments" />
            </div>
          </div>
          <hr className="ruler" />
          <div className="appointments_container">
            <div className="star_container">
              <h1 className="appointments">Appointments</h1>
              <button
                type="button"
                className={`starred_btn ${activeFilterBtn}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appoint_list">
              {filteredAppointments.map(appointDetails => (
                <AppointmentItem
                  key={appointDetails.id}
                  appointDetails={appointDetails}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
