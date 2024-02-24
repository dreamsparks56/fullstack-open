import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('insert a title...')
  const author = screen.getByPlaceholderText('insert the author...')
  const url = screen.getByPlaceholderText('insert the URL...')
  const sendButton = screen.getByText('save')

  await user.type(title, 'This would be the title')
  await user.type(author, 'This would be the author')
  await user.type(url, 'wwww.thiswouldbetheurl.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This would be the title')
  expect(createBlog.mock.calls[0][0].author).toBe('This would be the author')
  expect(createBlog.mock.calls[0][0].url).toBe('wwww.thiswouldbetheurl.com')
})