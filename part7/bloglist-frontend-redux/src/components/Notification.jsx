import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })

  const color = notification.success ? 'green' : 'red'

  const notificationStyle = {
    color: `${color}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div
      className={notification.success ? 'success' : 'error'}
      style={notification.message ? notificationStyle : null}
    >
      {notification.message}
    </div>
  )
}

export default Notification
