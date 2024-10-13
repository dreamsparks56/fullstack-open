import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { deleteNotification, sendNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const handleAnecdote = async (event) => {
        const createNotificationLength = 5000

      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(sendNotification(`The anecdote "${content}" has been successfully created.`))
      setTimeout(() => dispatch(deleteNotification()), createNotificationLength)
    }

    return(
        <div>            
            <h2>create new</h2>
            <form onSubmit={handleAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm
