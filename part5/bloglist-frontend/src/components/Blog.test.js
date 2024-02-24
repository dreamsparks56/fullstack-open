import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  test('renders content right', () => {
    const blog = {
      title: 'New title',
      author: 'New author',
      url: 'www.url.com',
      likes: 0
    }

    const { container } = render(<Blog blog={blog} />)

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
})

