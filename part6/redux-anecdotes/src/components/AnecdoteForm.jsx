import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const handleAnecdote = async (event) => {
        const notificationLengthInSecs = 5

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`The anecdote "${content}" has been successfully created.`, notificationLengthInSecs))
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
