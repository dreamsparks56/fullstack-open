import PropTypes from 'prop-types'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  const color = success ? 'green' : 'red'

  const notificationStyle =
    {
      color: `${color}`,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

  return (
    <div className = {success ? 'success' : 'error'} style= {message ? notificationStyle : null}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
}

export default Notification