import { Alert } from '@mui/material'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    <div>
      {console.log(notification)}
      {(notification &&
    <Alert severity={notification.success ? 'success' : 'error'}
    >
      {notification.message}
    </Alert>
      )}
    </div>
  )
}

export default Notification
