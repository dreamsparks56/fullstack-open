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
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification