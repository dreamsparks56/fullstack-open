const Anecdote = ({ anecdote }) => {
    return(
        <div>
            <h2>
                {anecdote.content} by {anecdote.author}
            </h2>
            <div>
                has {anecdote.votes} votes
            </div>
            <br></br>
            <div>
                for more info see {anecdote.info}
            </div>
            <br></br>
        </div>
    )
}

export default Anecdote