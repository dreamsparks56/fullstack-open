import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

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
      {console.log(notification)}
      {notification.message}
    </div>
  )
}

export default Notification
