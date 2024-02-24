import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  let container
  const blog = {
    title: 'New title',
    author: 'New author',
    url: 'www.url.com',
    likes: 0,
    user: {
      name: 'usw3rn4m3'
    }
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} verifyId={() => false}/>).container
  })

  test('renders content right initially', () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'New title'
    )
    expect(div).toHaveTextContent(
      'New author'
    )
    expect(div).not.toHaveTextContent(
      'www.url.com'
    )
    expect(div).not.toHaveTextContent(
      '0'
    )
  })

  test('renders content right after expanding', async () => {

    const div = container.querySelector('.blog')
    const toggler = screen.getByText('expand')

    await userEvent.click(toggler)
    screen.debug()

    expect(div).toHaveTextContent(
      'www.url.com'
    )
    expect(div).toHaveTextContent(
      '0'
    )
  })
})

