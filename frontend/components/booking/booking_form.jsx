import React from 'react';
import LandingNavBarContainer from '../navbar/landing_navbar_container';
import LessonOption from './lesson_option';
import OpenTimeOption from './open_time_option';

class BookingForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      studentId: this.props.currentUser.id,
      teacherId: parseInt(this.props.match.params.teacherId),
      lessonItemId: null,
      startTime: null,
      endTime: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.teacherId

    this.props.fetchTeacher(parseInt(id))
    this.props.fetchLessons(parseInt(id))
    this.props.fetchAllOpenTimeSlots(parseInt(id))
  }

  handleClick (type) {
    return e => {
      this.setState({
        [type]: parseInt(e.currentTarget.getAttribute('value'))
      })
    };
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.createBooking(this.state)
  }

  render () {
    if (
      !this.props.teacher ||
      !this.props.lessons ||
      !this.props.openTimeSlots
    ) {
      return null
    }
    const { teacher, lessons, openTimeSlots } = this.props
    return (
      <React.Fragment>
        <LandingNavBarContainer />
        <div className="booking-form-container">
          <h1>Teacher: {teacher.name}</h1>
          <form className="booking-form" onSubmit={this.handleSubmit}>
            <h1>Choose your lesson</h1>
            {lessons.map(lesson => {
              return (
                <LessonOption
                  key={lesson.id}
                  handleClick={this.handleClick}
                  lesson={lesson}
                />
              )
            })}
            <h1>Teacher Availablity</h1>
            {openTimeSlots.map(openTimeSlot => {
              return (
                <OpenTimeOption
                  key={openTimeSlot.id}
                  handleClick={this.handleClick}
                  openTimeSlot={openTimeSlot}
                />
              )
            })}
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default BookingForm
