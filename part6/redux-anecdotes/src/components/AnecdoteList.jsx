import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { deleteNotification, sendNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(state => {
        return state.filter === ''
            ? state.anecdotes
            : state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    const vote = (id) => {
        const voteNotificationLength = 5000

        dispatch(voteAnecdote(id))
        dispatch(sendNotification(`The note with the ID ${id} has been updated.`))
        setTimeout(() => dispatch(deleteNotification()), voteNotificationLength)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList